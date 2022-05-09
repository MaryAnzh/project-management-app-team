import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-item-modal',
  templateUrl: './create-new-item-modal.component.html',
  styleUrls: ['./create-new-item-modal.component.scss']
})

export class CreateNewItemModalComponent {
  private _errorMessage$: SubscriptionLike;

  public errorMessage: IErrorMessage = {
    errorMessage: '',
    isError: false,
  };

  @Input() public modalName: string = '';

  constructor(
    private pmDataService: PMDataService,
    private router: Router) {
    this._errorMessage$ = this.pmDataService.errorMessage$.subscribe(
      (value: IErrorMessage) => this.errorMessage = value
    )
  }

  createItem(title: string) {

  }

  closeError() {
    this.errorMessage.isError = false;
    this.errorMessage.errorMessage = '';
    this.pmDataService.changeErrorMessage(this.errorMessage);
  }

  closeModal() {
    const isModalOpen = false;
    this.pmDataService.changeModalOoen(isModalOpen);
  }

}
