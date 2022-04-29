import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return this.authService.isLogged().then(() => {
      if (localStorage.getItem('token')) {
        return true;
      } else {
        return this.router.createUrlTree(['auth', 'login']);
      }
    });
  }
}
