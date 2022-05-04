import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUserData, User } from '../../models/models';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // configUrl = 'http://localhost:4200/api';

  configUrl = 'https://stormy-tor-32770.herokuapp.com';

  constructor(private http: HttpClient) { }

  createUser(body: IUserData) {
    return this.http.post<any>(`${this.configUrl}/signup`, body, httpOptions);
  }

  authorizeUser(body: IUserData) {
    return this.http.post<any>(`${this.configUrl}/signin`, body, httpOptions);
  }

  getUsers(token: string) {
    // httpOptions.headers.append('Authorization', `Bearer ${token}`);
    // console.log(httpOptions)
    return this.http.get<User[]>(`${this.configUrl}/users`, httpOptions);
  }

}
