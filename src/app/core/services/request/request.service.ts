import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUserLoginData, User, IUseRegistrationData } from '../../models/request.model';

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

  constructor(private http: HttpClient) { }

  createUser(body: IUseRegistrationData): Observable<User> {
    return this.http.post<User>(`/signup`, body, httpOptions);
  }

  authorizeUser(body: IUserLoginData): Observable<any> {
    return this.http.post<any>(`/signin`, body, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/users`, httpOptions);
  }

}
