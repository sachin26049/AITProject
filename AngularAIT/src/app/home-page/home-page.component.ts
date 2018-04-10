import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {TestService} from '../services/test.service';
import {ResultService} from '../services/result.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  Test:any[];
  User:any;
  constructor(private router: Router,private AS:AuthService,private TS:TestService,private RS:ResultService) { }

  ngOnInit() {

    var email=JSON.parse(this.AS.getUser()).email;
    this.TS.loadTest(email).subscribe(data=>{
      if(data['success']==true)
      {
        this.Test=data['test'];
      }
      console.log(this.Test);
    });

    console.log(this.AS.getUser());
    this.User=JSON.parse(this.AS.getUser()).results;
    console.log(this.User);
  }
gotoTest()
{
  this.router.navigate(['TakeTest']);
}
gotoCreate()
{

this.router.navigate(['AddTest']);
}

showResults(i:any)
{  
this.RS.setResult(this.Test[i]);
this.router.navigate(['Results']);  

}



}
