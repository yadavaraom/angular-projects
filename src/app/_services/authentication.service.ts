import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    http: HttpClient;

    constructor(http: HttpClient) {
      this.http = http;
    }
    public getToken(): any {
     // console.log('get Token');
      return this.http.get('/app/token').subscribe(function(data){
      //  console.log(data['token']);
        localStorage.setItem('token',data['token']);
      });
  
  
    }
    public tok() {
      return localStorage.getItem('token');
    }
}