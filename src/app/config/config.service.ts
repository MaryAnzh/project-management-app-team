import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Content-Type':  'application/json',
  })
};

export interface User {
  name?: string,
  login: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // configUrl = 'http://localhost:4200/api';

  configUrl = 'https://stormy-tor-32770.herokuapp.com';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<any>(this.configUrl);
  }

  createUser(body: User) {
    return this.http.post<any>(`${this.configUrl}/signup`, body, httpOptions);
  }

  logIn(body: User) {
    return this.http.post<any>(`${this.configUrl}/signin`, body, httpOptions);
  }

  getUsers(token: string) {
    httpOptions.headers.append('Authorization', `Bearer ${token}`);
    console.log(httpOptions)
    return this.http.get<any>(`${this.configUrl}/users`, httpOptions);
  }

}
