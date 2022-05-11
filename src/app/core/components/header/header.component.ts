import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import {IBoardData, IResAuthLogin} from '../../models/request.model';
import { TranslateService } from '@ngx-translate/core';
import {BoardsService} from "../../../project-management/services/boardService/boards.service";

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

  public boardInfo$: SubscriptionLike;

  public boardInfo: IBoardData[] | null = null;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private boardsService: BoardsService) {
    this._isAuth$ = this.authService.isLoggedIn$.subscribe(
      (value: boolean) => this.isAuth = value
    )

    this._userName$ = this.authService.user$.subscribe(
      (value: IResAuthLogin | null) => this.userName = value ? value.name : ''
    )

    this.boardInfo$ = this.boardsService.allBoards$.subscribe(
      (data) => this.boardInfo = data)

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

  getAllBoards():void {
    this.boardsService.getAllBoards();
  }
 }
