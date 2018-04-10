import { Injectable } from '@angular/core';

@Injectable()
export class ResultService {
  Result:any;
  constructor() { }
  setResult(r:any)
  {
    this.Result=r;
  }

  getResult()
  {
    return this.Result;
  }

}
