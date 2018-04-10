import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
@Injectable()
export class TestService {

  constructor(private http:HttpClient) { }
  test:any;
  addTest(test:any)
  {
    return this.http.post('http://localhost:3000/test/add',test);
  }

  searchTest(name:any)
  {
    return this.http.get('http://localhost:3000/test/search?name='+name);
  }

  setTest(test:any)
  {
    this.test=test;
  }

  getTest()
  {
    return this.test;
  }
  sendResult(result:any)
  {
    return this.http.post('http://localhost:3000/test/addResult',result);
    
  }
  sendResultToUser(result:any)
  {
    return this.http.post('http://localhost:3000/users/addResult',result);
  }

  loadTest(email:any)
  {
    return this.http.get('http://localhost:3000/test/searchBySetter?email='+email);
  }
}
