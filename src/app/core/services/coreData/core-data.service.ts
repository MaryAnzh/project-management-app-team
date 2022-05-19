import { Injectable } from '@angular/core';
import { Subject, SubscriptionLike } from 'rxjs';
import { RequestService } from '../request/request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CoreDataService {

  confirmClick = new Function;

  cancelClick = new Function;

  public showAsync(data = null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.confirmClick = (): void => {
        this.closeConfirmationModal();
        resolve(data);
      };
      this.cancelClick = (): void => {
        this.closeConfirmationModal();
        reject(data);
      }
    })
  }

  private _isConfirmationModalOpen$$ = new Subject<boolean>();

  public isConfirmationModalOpen$ = this._isConfirmationModalOpen$$.asObservable();

  private _isActionConfirm$$ = new Subject<boolean | null>();

  public isActionConfirm$ = this._isActionConfirm$$.asObservable();

  public isActionConfirm: boolean | null = null;

  constructor() {
    this.isActionConfirm$.subscribe(
      value => this.isActionConfirm = value
    )
  }

  async openConfirmationModal(): Promise<any> {
    this._isConfirmationModalOpen$$.next(true);
    return this.showAsync();
  }

  closeConfirmationModal(): void {
    this._isConfirmationModalOpen$$.next(false);
  }

  actionConfirm(action: boolean): boolean {
    this.closeConfirmationModal();
    return action;
  }


}
