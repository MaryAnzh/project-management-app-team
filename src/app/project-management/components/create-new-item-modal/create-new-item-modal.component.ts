import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-item-modal',
  templateUrl: './create-new-item-modal.component.html',
  styleUrls: ['./create-new-item-modal.component.scss']
})

export class CreateNewItemModalComponent {
  private _errorMessage$: SubscriptionLike;
  public boardId: string = '';

  public errorMessage: IErrorMessage = {
    errorMessage: '',
    isError: false,
  };

  @Input() public modalName: string = '';

  constructor(
    private pmDataService: PMDataService,
    private router: Router,
    public translate: TranslateService,
    private route: ActivatedRoute
    ) {
    this._errorMessage$ = this.pmDataService.errorMessage$.subscribe(
      (value: IErrorMessage) => this.errorMessage = value
    );

    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id ? id : '';

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  createItem(name: string, title: string) {
    switch (name) {
      case 'column':
        this.pmDataService.createColumn(this.boardId, title, 1);
        break;

      default:
        break;
    }
    this.closeModal();
  }

  closeError() {
    this.errorMessage.isError = false;
    this.errorMessage.errorMessage = '';
    this.pmDataService.changeErrorMessage(this.errorMessage);
  }

  closeModal() {
    this.pmDataService.closeCreationColumnTaskModal();
  }

}
