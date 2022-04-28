import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;

  login(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
    localStorage.clear();
    sessionStorage.clear();
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuth);
      }, 1000);
    });
  }
}
