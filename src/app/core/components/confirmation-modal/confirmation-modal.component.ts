import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../../services/coreData/core-data.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

export class ConfirmationModalComponent {

  constructor(private coreDataService: CoreDataService) { }

  actionOnClick(e: Event) {
    const elem = <HTMLElement>e.target;
    const type = elem.dataset['type'];
    let action = false;
    if (type) {
      switch (type) {
        case 'confirm': action = true;

          break;

        case 'cancel': action = false;;

          break;

        default:
          break;
      }
    }
    this.coreDataService.actionConfirm(action);
  }
}
