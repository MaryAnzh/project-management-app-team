import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;

  constructor(private router: Router) {}

  login(): void {
    this.isAuth = true;
    localStorage.setItem('token', 'someToken');
    this.router.navigate(['/project-management']);
  }

  logout(): void {
    this.isAuth = false;
    localStorage.removeItem('token');
    this.router.navigate(['/info']);
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuth);
      }, 1000);
    });
  }
}
