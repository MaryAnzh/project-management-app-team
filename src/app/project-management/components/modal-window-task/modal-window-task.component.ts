import { Component, Input, OnInit } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormControlDirective } from '@angular/forms';
import { IBoardData, IColumnsData, INewTaskData, ITaskData, IUpdateTaskData } from 'src/app/core/models/request.model';
import { TaskDataService } from '../../services/TaskData/task-data.service';

@Component({
  selector: 'app-modal-window-task',
  templateUrl: './modal-window-task.component.html',
  styleUrls: ['./modal-window-task.component.scss']
})

export class ModalWindowTaskComponent implements OnInit {
  public newTaskForm: FormGroup;

  public boardInfo: IBoardData = { id: '', title: '', description: '', columns: [] };
  public columns: IColumnsData[] | undefined = undefined;
  public tasks: ITaskData[] | undefined = undefined;
  task: ITaskData | null = null;
  columnId: string | undefined = undefined;

  constructor(
    private pmDataService: PMDataService,
    private taskDataService: TaskDataService,
    public translate: TranslateService,

  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    this.boardInfo = this.pmDataService.currentBoard;
    this.columns = this.boardInfo.columns;


    const firstColumn = this.columns ? this.columns[0] : '--select--';
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
      selectColumn: new FormControl(firstColumn),
    });
  }

  ngOnInit(): void {
    if (this.taskDataService.editTask && this.taskDataService.editTaskColumnId) {
      this.task = this.taskDataService.editTask;
      this.columnId = this.taskDataService.editTaskColumnId;
      this.newTaskForm = new FormGroup({
        title: new FormControl(this.task.title, [
          Validators.required,
          Validators.maxLength(30),
        ]),
        description: new FormControl(this.task.description, [
          Validators.required,
          Validators.maxLength(150),
        ]),
        doneCheck: new FormControl(this.task.done),
        selectColumn: new FormControl(),
      });
    }
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

  sunmit() {
    if (this.task) {
      this.editYask();
    } else {
      this.createTask();
    }
  }

  createTask() {
    const columnOrder = (this.newTaskForm.value.selectColumn.order - 1);
    const columnForTask: IColumnsData = this.boardInfo.columns ? this.boardInfo.columns[columnOrder] : { id: '', title: '', order: 0, tasks: [] };

    const columnId = columnForTask.id;
    const title = this.newTaskForm.value.title;
    const order = columnForTask.tasks ? columnForTask.tasks.length + 1 : 1;
    const done = this.newTaskForm.value.doneCheck ? true : false;
    const description = this.newTaskForm.value.description;
    const user = this.taskDataService.getCurrentUser();

    const body: INewTaskData = {
      title: title,
      order: order,
      done: done,
      description: description,
      userId: user.id,
    }
    this.pmDataService.createTask(columnId, body);
    this.closeModalWindow();
  }

  editYask() {
    const columnId = this.columnId ?? '';
    if (this.task) {
      const body: IUpdateTaskData = {
        title: this.newTaskForm.value.title,
        description: this.newTaskForm.value.description,
        done: this.newTaskForm.value.doneCheck,
        order: this.task.order,
        userId: this.task.userId,
        boardId: '',
        columnId: columnId,
      }
      this.pmDataService.updateTask(columnId, this.task.id, body);
    }
  }

  closeModalWindow() {
    if (this.task) {
      this.taskDataService.closeEditTaskWindow();
      this.taskDataService.editTask = null;
      this.taskDataService.editTaskColumnId = null;
    } else {
      this.pmDataService.closeNewTaskModal();
    }
    this.task = null;
    this.columnId = '';
  }
}
