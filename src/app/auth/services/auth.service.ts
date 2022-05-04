import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { StorageService } from './storage.service';

interface IResAuthLogin {
  login: string,
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user$$ = new BehaviorSubject<IResAuthLogin | null>(null);

  public isLoggedIn$ = this._user$$.asObservable().pipe(map(user => user !== null));

  public user$ = this._user$$.asObservable();

  constructor(private router: Router, private storage: StorageService) {
    const user: IResAuthLogin | null = this.storage.getData('user');
    if(user) {
      this._user$$.next(user);
    }
  }

  login(name: string, token: string): void {
    // const token = 'asdfgh'
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
