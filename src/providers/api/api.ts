import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  url = "http://localhost:5000";

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  async Authenticate(username, password) {
    const body = { username: username, password: password };

    try {
      const response = await this.http.post<any>(this.url + '/api/auth/login', body).toPromise();

      return response;
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  async Register(username, password) {
    const body = { username: username, password: password };

    try {
      const response = await this.http.post<any>(this.url + '/api/auth/register', body).toPromise();

      return response;
    } catch (error) {
      console.log(error)
    }

  }

}