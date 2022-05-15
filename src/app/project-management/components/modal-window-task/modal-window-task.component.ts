import { Component } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-window-task',
  templateUrl: './modal-window-task.component.html',
  styleUrls: ['./modal-window-task.component.scss']
})

export class ModalWindowTaskComponent {
  newTaskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    doneCheck: new FormControl(''),
    selectColumn: new FormControl(''),
  });

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
