import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ITaskData, User } from 'src/app/core/models/request.model';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { TaskDataService } from '../../services/TaskData/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @Input() public task: ITaskData | undefined;
  public userSubscription: Subscription | null = null;

  public boardId: string = '';

  private _userName$$ = new Subject<string>();
  public userName$ = this._userName$$.asObservable();
  public userName: string = 'user deleted';

  constructor(
    private taskDataService: TaskDataService,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id ? id : '';
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

}
