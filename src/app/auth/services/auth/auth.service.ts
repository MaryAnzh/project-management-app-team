import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { IResAuthLogin, IUseRegistrationData, Token } from 'src/app/core/models/request.model';
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

  public isLoggedIn$ = this._user$$.asObservable().pipe(map(user => user !== null));
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
      (response) => {
        console.log('response received');
        console.log(response);
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
          token: response.token
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
}
