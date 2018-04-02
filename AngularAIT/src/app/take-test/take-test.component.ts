import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TestService} from '../services/test.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {
name:any;
flag:any;
Test:any[];
passkey:any[];
  constructor(private AS:AuthService,private TS:TestService,private Flash:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    this.flag=0;
    this.passkey=new Array();
  }

  searchTest()
  {
    console.log(this.name);
    this.TS.searchTest(this.name).subscribe(data=>{
      console.log(data);
      if(data['success']==true)
      {
       this.Test=data['test'];
       console.log(this.Test);
       this.flag=1; 
       
      }
    })
  }

  takeTest(i:any)
  {
  console.log(i);  
  console.log(this.passkey[i]);
  if(this.passkey[i]==this.Test[i].passkey)
  {
   console.log("correctKey");
   this.Flash.show("Passkey Matched!",{ cssClass: 'alert-success' }); 
   this.TS.setTest(this.Test[i]);
   this.router.navigate(['test']);
  }
  else
  {
    this.Flash.show("Wrong Passkey!! try again",{ cssClass: 'alert-danger' });
  }

  }

}
