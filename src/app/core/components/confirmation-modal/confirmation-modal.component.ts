import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreDataService } from '../../services/coreData/core-data.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

export class ConfirmationModalComponent {

  confirmClick = new Function;

  cancelClick = new Function;

  constructor(
    private coreDataService: CoreDataService,
    public translate: TranslateService
  ) {
    this.confirmClick = this.coreDataService.confirmClick;
    this.cancelClick = this.coreDataService.cancelClick;

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

}
