import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { IResAuthLogin } from 'src/app/core/models/models';
import { StorageService } from '../storage/storage.service';
import { IUserData } from 'src/app/core/models/models';
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

  registration(user: IUserData) {
    return this.requestService.createUser(user).subscribe(
      (response) => {                           //Next callback
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

  login(name: string, token: string): void {
    const userData: IResAuthLogin = {
      login: name,
      token: token
    }
    this._user$$.next(userData);
    this.storage.setData('user', userData)
  }

  logout(): void {
    this.storage.setData('user', null);
    this._user$$.next(null)
  }
}
