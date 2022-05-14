import { Component } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-window-task',
  templateUrl: './modal-window-task.component.html',
  styleUrls: ['./modal-window-task.component.scss']
})
export class ModalWindowTaskComponent {

  constructor(
    private pMDataService: PMDataService,
    public translate: TranslateService,
  ) {

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
   }


  createTask() { }

  closeModalWindow() {
    this.pMDataService.closeModalWindowNewTask();
}
}
