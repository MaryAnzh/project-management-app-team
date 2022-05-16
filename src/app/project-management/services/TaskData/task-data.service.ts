import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Router } from '@angular/router';
import { map, Subscription, Subject, Observable } from 'rxjs';
import { IUserInfoForTask } from '../../model/user-info.model';
import { IResAuthLogin, User } from 'src/app/core/models/request.model';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class TaskDataService {
  private userNameSubscription: Subscription | null = null;

  constructor(
    private requestService: RequestService,
    private router: Router,
    public storageService: StorageService
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
}
