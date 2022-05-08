import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IResAuthLogin } from '../../models/request.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  private _isAuth$: SubscriptionLike;

  public isAuth: boolean = false;

  private _userName$: SubscriptionLike;

  public userName: string = '';

  constructor(private authService: AuthService) {
    this._isAuth$ = this.authService.isLoggedIn$.subscribe(
      (value: boolean) => this.isAuth = value
    )

    this._userName$ = this.authService.user$.subscribe(
      (value: IResAuthLogin | null) => this.userName = value ? value.name : ''
    )
  }

  logOutOnClick(): void {
    this.authService.logout();
  }
 }
