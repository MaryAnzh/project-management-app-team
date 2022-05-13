import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board-title',
  templateUrl: './board-title.component.html',
  styleUrls: ['./board-title.component.scss']
})

export class BoardTitleComponent {
  private _errorMessage$: SubscriptionLike;

  public errorMessage: IErrorMessage = {
    errorMessage: '',
    isError: false,
  };

  constructor(
    private pmDataService: PMDataService,
    private router: Router,
    public translate: TranslateService
    ) {
    this._errorMessage$ = this.pmDataService.errorMessage$.subscribe(
      (value: IErrorMessage) => this.errorMessage = value
    )

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  createBoard(title: string, description: string) {
    this.pmDataService.createBoard(title, description);

  }

  closeError() {
    this.errorMessage.isError = false;
    this.errorMessage.errorMessage = '';
    this.pmDataService.changeErrorMessage(this.errorMessage);
  }
}
