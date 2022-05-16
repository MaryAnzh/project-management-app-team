import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ITaskData, User } from 'src/app/core/models/request.model';
import { TranslateService } from '@ngx-translate/core';
import { TaskDataService } from '../../services/TaskData/task-data.service';
import { Subject, Subscription } from 'rxjs';
import { PMDataService } from '../../services/PMData/pmdata.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @Input() public task: ITaskData | undefined;
  @Input() public columnId: string | undefined;
  public userSubscription: Subscription | null = null;

  public boardId: string = '';

  private _userName$$ = new Subject<string>();
  public userName$ = this._userName$$.asObservable();
  public userName: string = 'user deleted';

  constructor(
    private taskDataService: TaskDataService,
    private pmDataService: PMDataService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

  }

  getName(id: string) {
    return this.taskDataService.getUserName(id);
  }

  ngOnInit(): void {

    const userId = this.task ? this.task.userId : '';

    this.taskDataService.getUserName(userId).subscribe(
      (value) => this._userName$$.next(value)
    );
  }

  deleteTask() {
    const type = 'task';
    const columnId = this.columnId ?? '';
    const taskId = this.task ? this.task.id : '';
    this.pmDataService.showConfirmationModal(type, columnId, taskId);
  }

  editTask() {
    if (this.task) {
          console.log(this.task)
    }
  }

}
