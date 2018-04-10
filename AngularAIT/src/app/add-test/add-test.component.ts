import { Component, OnInit } from '@angular/core';
import {TestService} from '../services/test.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  n:any;
  question:any;
  option:any[];
  correct:any;
  des:any;
  x:any;
  questions:any[];
  name:any;
  pass:any;
  constructor(
    private AS:AuthService,
    private TS:TestService,
    private router:Router
  ) { }

  ngOnInit() {
    this.n=0;
    this.question="";
    this.option=new Array(4);
    this.correct="";
    this.x=0;
    this.questions=new Array();
  }

  addQuestion()
  {
    var question={
      "question":this.question,
      "option1":this.option[0],
      "option2":this.option[1],
      "option3":this.option[2],
      "option4":this.option[3],
      "correct":this.correct
   
    }
    this.questions.push(question); 
    this.question="";
    this.option=new Array(4);
    this.correct="";
    this.x++;
  }

  createTest()
  {
    console.log(this.questions);
    var test={
      "name":this.name,
      "passkey":this.pass,
      "des":this.des,
      "setter":JSON.parse(this.AS.getUser()).name,
      "setterEmail":JSON.parse(this.AS.getUser()).email,
      "questions":this.questions
    }
    console.log(test);
    this.TS.addTest(test).subscribe(data=>{
      if(data['success']==true)
      {
        console.log("testAdded");
        this.router.navigate(['']);
      }
      else
      {
        console.log("testNotAdded");
      }
    });
  }

}
