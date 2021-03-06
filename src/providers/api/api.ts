import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RaceRequest } from '../../models/api';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  url = "http://localhost:5000";

  constructor(public http: HttpClient, public storage: Storage) {
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

  async GetRaces() {

    const JWT = await this.storage.get('jwt');
    const headers = new HttpHeaders().set('Authorization', JWT)
    const userid = await this.storage.get('userid');

    try {
      const response = await this.http.get<any>(`${this.url}/races/${userid}`, { 'headers': headers }).toPromise();

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async PostRace(req: RaceRequest) {

    const JWT = await this.storage.get('jwt');
    const userid = await this.storage.get('userid');
    const headers = new HttpHeaders({
      'Authorization': JWT,
      'user': userid
    })

    try {
      const response = await this.http.post<any>(`${this.url}/races`, req, {'headers': headers}).toPromise();

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error)
    }

  }

}
