import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestService } from '../request/request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CoreDataService {
  private _isConfirmationModalOpen$$ = new Subject<boolean>();
  public isConfirmationModalOpen$ = this._isConfirmationModalOpen$$.asObservable();

  private _isActionConfirm$$ = new Subject<boolean | null>();
  public isActionConfirm$ = this._isActionConfirm$$.asObservable();
  public isActionConfirm: boolean | null = null;

  private fun: Function = new Function;
  private param: string = '';

  constructor(private requestService: RequestService, private router: Router) {
    this.isActionConfirm$.subscribe(
      value => this.isActionConfirm = value
    )
  }

  openConfirmationModal(fun: Function, param: string) {
    this._isConfirmationModalOpen$$.next(true);
    this.fun = fun;
    this.param = param;
  }

  closeConfirmationModal() {
    this._isConfirmationModalOpen$$.next(false);
  }

  actionConfirm(action: boolean) {
    console.log(`Отработал core, id = ${this.param} и ${this.fun}`);
    console.log(`action = ${action}`);
    if (action) {
      this.fun(this.param);
      console.log(`Удаление отработало`);
    }
    this.closeConfirmationModal();

  }
}
