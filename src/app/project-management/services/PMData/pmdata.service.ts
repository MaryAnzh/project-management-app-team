import { Injectable } from '@angular/core';
import { IBoardTitle, IBoardData, IBoardUpdate } from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';
import { CoreDataService } from 'src/app/core/services/coreData/core-data.service';

@Injectable({
  providedIn: 'root'
})

export class PMDataService {
  private _currentBordId: string = '';
  private _errorMessage$$ = new Subject<IErrorMessage>();

  public errorMessage$ = this._errorMessage$$.asObservable();

  private _isModalOoen$$ = new Subject<boolean>();
  public isModalOoen$ = this._isModalOoen$$.asObservable();

  constructor(
    private requestService: RequestService,
    private router: Router,
    private coreDataService: CoreDataService
  ) {
  }

  createBoard(title: string) {
    const board: IBoardTitle = {
      title: title,
    }

    this.requestService.createBoard(board).subscribe(
      {
        next: (response: IBoardData) => {
          this._currentBordId = response.id;
          this.router.navigateByUrl(`main/board/${response.id}`);
        },
        error: (error: HttpErrorResponse) => {
          console.error(`${error.statusText} error caught`);
          const errorMessage: IErrorMessage = {
            errorMessage: '',
            isError: true,
          }

          if (error.statusText === 'Unknown Error') {
            errorMessage.errorMessage = 'Check the connection at the network'
          } else {
            errorMessage.errorMessage = error.error.message
          }
          this._errorMessage$$.next(errorMessage);
        }
      }
    );

  }

  getBoard(id: string): IBoardData {
    const boardInfo: IBoardData = {
      id: id,
      title: ''
    }
    this.requestService.getBoard(id).subscribe(
      {
        next: (response: IBoardData) => boardInfo.title = response.title,
        error: (error: HttpErrorResponse) => console.error(error.message),
      }
    );
    return boardInfo;
  }

  upDateBoard(id: string, title: string): IBoardData | null {
    const body: IBoardUpdate = {
      title: title,
    }
    let boardInfo: IBoardData | null = null;
    this.requestService.updateBoard(id, body).subscribe({
      next: (response: IBoardData) => boardInfo = response,
      error: (error: HttpErrorResponse) => console.error(error.message)
    });

    return boardInfo;
  }

  deleteBoard(id: string) {
    this.requestService.deleteBoard(id).subscribe({
      next: (response: any) => console.log(response),
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
    this.router.navigateByUrl('main');
  }

  changeErrorMessage(errorMessage: IErrorMessage) {
    this._errorMessage$$.next(errorMessage);
  }

  changeModalOoen(onOff: boolean) {
    this._isModalOoen$$.next(onOff);
  }

  openConfirmationModal(param: string) {
    this.coreDataService.openConfirmationModal(this.deleteBoard, param);
    console.log(`Отработал openConfirmationModal, передал ${param} и ${this.deleteBoard
}`);
  }

}
