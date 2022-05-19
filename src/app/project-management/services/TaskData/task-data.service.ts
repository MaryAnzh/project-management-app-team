import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Router } from '@angular/router';
import { map, Subscription, Subject, Observable, mergeMap } from 'rxjs';
import { IUserInfoForTask } from '../../model/user-info.model';
import { IResAuthLogin, ITaskData, ITaskSearchData, User } from 'src/app/core/models/request.model';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class TaskDataService {
  private userNameSubscription: Subscription | null = null;
  private _isEditTaskWindowOpen$$ = new Subject<boolean>();
  public isEditTaskWindowOpen$ = this._isEditTaskWindowOpen$$.asObservable();

  public editTask: ITaskData | null = null;
  public editTaskColumnId: string | null = null;

  public tasks: ITaskSearchData[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router,
    public storageService: StorageService,
  ) {

  }

  getCurrentUser(): IUserInfoForTask {
    const user: IResAuthLogin | null = this.storageService.getData('user');
    const userInfoForTask: IUserInfoForTask = { id: '', name: '' };
    if (user) {
      userInfoForTask.id = user.userId;
      userInfoForTask.name = user.name;
    }

    return userInfoForTask;
  }

  getUserName(userId: string): Observable<string>
  {
    return this.requestService.getUsers()
      .pipe(
        map((user) => {
          return user.find((userInfo) => userInfo.id === userId)?.name ?? ''
        })
      )
  }

  showEditTaskWindow() {
    this._isEditTaskWindowOpen$$.next(true);
  }

  closeEditTaskWindow() {
    this._isEditTaskWindowOpen$$.next(false);

  }

  getTasksOfBoard(id: string) {
    return this.requestService.getColumns(id).pipe(
      map((el) => el.map((elem) => elem.id)),
      mergeMap((ids) => ids.map((i) => {
        this.requestService.getTasks(id, i).subscribe((res) => this.tasks.push(...res));
        return this.tasks;
      }))
    )
  }
}
