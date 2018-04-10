import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import {AuthService} from '../services/auth.service';
// import {TestService} from '../services/test.service';
import {ResultService} from '../services/result.service';
@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  Results:any;
  Rs:any[];
  constructor(private router: Router,private RS:ResultService) { }

  ngOnInit() {
    this.Results=this.RS.getResult();
    this.Rs=this.Results.Results;
    console.log(this.Results);
  }

}
