import { Component } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormControlDirective } from '@angular/forms';
import { IBoardData, IColumnsData } from 'src/app/core/models/request.model';

@Component({
  selector: 'app-modal-window-task',
  templateUrl: './modal-window-task.component.html',
  styleUrls: ['./modal-window-task.component.scss']
})

export class ModalWindowTaskComponent {
  public newTaskForm: FormGroup;

  public boardInfo: IBoardData = { id: '', title: '', description: '', columns: [] };
  public columns: IColumnsData[] | undefined = undefined;

  constructor(
    private pmDataService: PMDataService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    this.boardInfo = this.pmDataService.currentBoard;
    this.columns = this.boardInfo.columns;

    const firstColumn = this.columns ? this.columns[0].title : '';
    console.log(firstColumn);
    this.newTaskForm = new FormGroup({
      title: new FormControl('Привет', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      doneCheck: new FormControl(''),
      selectColumn: new FormControl(firstColumn),
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
    this.pmDataService.closeModalWindowNewTask();
  }
}
