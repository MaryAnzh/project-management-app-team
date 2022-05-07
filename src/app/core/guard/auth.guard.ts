import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router, RouterStateSnapshot, ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let iwAuth = false;
    this.authService.isLoggedIn$.subscribe(
      value => iwAuth = value
    )
    if (!iwAuth) {
      this.router.navigateByUrl('/welcome');
    } else {
      let date = ''
      this.authService.user$.subscribe(
        (value) => date = value?.date ? value?.date : ''
      )

      this.authService.tokenDateExpired(date.toString());
    }

    return iwAuth;
  }
}
