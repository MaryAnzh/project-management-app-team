import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { IResAuthLogin, IUseRegistrationData, Token, User } from 'src/app/core/models/request.model';
import { StorageService } from '../storage/storage.service';
import { IUserLoginData } from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IErrorMessage } from '../../model/respons-error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user$$ = new BehaviorSubject<IResAuthLogin | null>(null);
  private _errorMessage$$ = new Subject<IErrorMessage>();
  private _millisecond: number = 86400000;

  public isLoggedIn$ = this._user$$.asObservable().pipe(map((user) => {
    return (user !== null
      && this.tokenDate(user.date))
  }))


  public user$ = this._user$$.asObservable();
  public errorMessage$ = this._errorMessage$$.asObservable();


  constructor(
    private router: Router,
    private storage: StorageService,
    private requestService: RequestService
  ) {
    const user: IResAuthLogin | null = this.storage.getData('user');
    if (user) {
      this._user$$.next(user);
    }
  }

  registration(user: IUseRegistrationData) {
    return this.requestService.createUser(user).subscribe(
      (response: User) => {
        const userData: IUserLoginData = {
          login: user.login,
          password: user.password
        }

        this.login(userData);
      },
      (error: HttpErrorResponse) => {
        console.error(`Ощибка ${error.status} поймана`);
        const errorMessage: IErrorMessage = {
          errorMessage: error.error.message,
          isError: true,
        }

        this._errorMessage$$.next(errorMessage);
      }
    )
  }

  login(userData: IUserLoginData): void {

    this.requestService.authorizeUser(userData).subscribe(
      (response: Token) => {
        const storageData: IResAuthLogin = {
          name: userData.login,
          token: response.token,
          date: new Date(),
        }
        this.storage.setData('user', storageData);
        this._user$$.next(storageData);
        this.router.navigateByUrl('/main');
      },
      (error: HttpErrorResponse) => {
        console.error(`Ощибка ${error.status} поймана`);
        const errorMessage: IErrorMessage = {
          errorMessage: error.error.message,
          isError: true,
        }
        this._errorMessage$$.next(errorMessage);
      });
  }

  logout(): void {
    this.storage.setData('user', null);
    this._user$$.next(null)
  }

  tokenDate(date: Date): boolean {
    const tokenAge = +(new Date()) - +date;
    let isTokenExpired = (tokenAge > this._millisecond) ? true : false;
    if (isTokenExpired) {
      this.logout;
    }
    return isTokenExpired;
  }
}
