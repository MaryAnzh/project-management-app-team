import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IResAuthLogin } from '../../models/request.model';
import { TranslateService } from '@ngx-translate/core';

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

  public isActiveLanguageRu: boolean = false;
  public isActiveLanguageEn: boolean = true;

  public id: string = '123';

  constructor(private authService: AuthService, public translate: TranslateService) {
    this._isAuth$ = this.authService.isLoggedIn$.subscribe(
      (value: boolean) => this.isAuth = value
    )

    this._userName$ = this.authService.user$.subscribe(
      (value: IResAuthLogin | null) => this.userName = value ? value.name : ''
    )

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  logOutOnClick(): void {
    this.authService.logout();
  }

  translateLanguageTo(lang: string): void {
    this.translate.use(lang);
    switch (lang) {
      case 'ru':
        this.isActiveLanguageRu = true;
        this.isActiveLanguageEn = false;
        break;

      case 'en':
        this.isActiveLanguageRu = false;
        this.isActiveLanguageEn = true;
        break;

      default:
        break;
    }
  }
 }
