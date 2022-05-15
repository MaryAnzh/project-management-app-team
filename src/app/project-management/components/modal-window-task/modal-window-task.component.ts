import { Component, Input } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { IBoardData, IColumnsData } from 'src/app/core/models/request.model';
import { IColumnCreationRespons } from 'src/app/core/models/response.model';

@Component({
  selector: 'app-modal-window-task',
  templateUrl: './modal-window-task.component.html',
  styleUrls: ['./modal-window-task.component.scss']
})

export class ModalWindowTaskComponent {
  public newTaskForm: FormGroup;

  @Input() public boardInfo: IBoardData = { id: '', title: '', description: '', columns: [] };

  constructor(
    private pMDataService: PMDataService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    const columns: IColumnsData[] = this.boardInfo.columns ? this.boardInfo.columns : [];

    this.newTaskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      doneCheck: new FormControl(''),
      selectColumn: new FormControl,
    });
  }

  get title(): AbstractControl {
    return <AbstractControl>this.newTaskForm.get('title');
  }
  get description(): AbstractControl {
    return <AbstractControl>this.newTaskForm.get('description');
  }

  get doneCheck(): AbstractControl {
    return <AbstractControl>this.newTaskForm.get('doneCheck');
  }

  get selectColumn(): AbstractControl {
    return <AbstractControl>this.newTaskForm.get('selectColumn');
  }

  createTask() { }

  closeModalWindow() {
    this.pMDataService.closeModalWindowNewTask();
  }
}
