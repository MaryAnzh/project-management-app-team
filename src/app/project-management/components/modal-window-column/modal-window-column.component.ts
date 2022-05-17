import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormControlDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PMDataService } from '../../services/PMData/pmdata.service';

@Component({
  selector: 'app-modal-window-column',
  templateUrl: './modal-window-column.component.html',
  styleUrls: ['./modal-window-column.component.scss', '../modal-window-task/modal-window-task.component.scss']
})
export class ModalWindowColumnComponent {
  public newColumnForm: FormGroup;

  constructor(
    private pmDataService: PMDataService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    this.newColumnForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }

  get title(): AbstractControl {
    return <AbstractControl>this.newColumnForm.get('title');
  }

  sunmit() {
    this.pmDataService.createColumn(this.newColumnForm.value.title);
    this.pmDataService.closeCreationColumnTaskModal();
  }

  cancel() {
    this.pmDataService.closeCreationColumnTaskModal();
  }

}
