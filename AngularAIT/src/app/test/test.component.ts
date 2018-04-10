import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TestService} from '../services/test.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test:any;
  flag:any;
  selected:any[];
  flag1:any;
  CorrectCount:any;
  total:any;
  constructor(private AS:AuthService,private TS:TestService,private Flash:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    this.test=this.TS.getTest();
    this.flag=0;
    this.selected=new Array(this.test.questions.length);
    this.total=this.test.questions.length;
  }

  startTest()
  {
   this.flag=1; 
   
  }

  submitTest()
  {
   console.log(this.selected); 
    this.flag=2;
    var count=0;
    for(var i=0;i<this.selected.length;i++)
    {
     if(this.selected[i]==this.test.questions[i].correct)
     count++; 
    }
    this.CorrectCount=count;
    var user=JSON.parse(this.AS.getUser());
    var result={
      name:user.name,
      email:user.email,
      total:this.CorrectCount,
      testname:this.test.name,
      des:this.test.des,
      setter:this.test.setter,
      id:this.test._id,
      totalQuestions:this.total
    }
    console.log(result);
    this.TS.sendResult(result).subscribe(data=>{
     if(data['success']==true)
     {
       alert("Done!");
       this.TS.sendResultToUser(result).subscribe(data=>{
        if(data['success']==true)
        {
          alert("Done!");
          this.router.navigate(['']);
        }
        else
        {
          console.log("something went wrong");
          
        } 
       });
     }
     else
     {
       console.log("something went wrong");
     } 
    });
  }
}
