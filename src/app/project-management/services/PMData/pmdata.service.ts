import { Injectable } from '@angular/core';
import {
  IBoardDescription,
  IBoardData,
  IBoardUpdate,
  IColumnsRequestData,
  IColumnsData
} from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';
import { CoreDataService } from 'src/app/core/services/coreData/core-data.service';

@Injectable({
  providedIn: 'root'
})

export class PMDataService {

  private _currentBord$$ = new Subject<IBoardData | null>();
  public currentBord$ = this._currentBord$$.asObservable();
  public currentColumns = this._currentBord$$.asObservable().pipe(map((value: IBoardData | null) => value?.columns));
  public currentBord: IBoardData | null = null

  private _errorMessage$$ = new Subject<IErrorMessage>();

  public errorMessage$ = this._errorMessage$$.asObservable();

  private _isModalOoen$$ = new Subject<boolean>();
  public isModalOoen$ = this._isModalOoen$$.asObservable();

  constructor(
    private requestService: RequestService,
    private router: Router,
    private coreDataService: CoreDataService
  ) {
    this.currentBord$.subscribe(
      (value) => {
        this.currentBord = value;
        console.log('value Обновлено');
        console.log(value);
      }
    )
  }

  createBoard(title: string, description: string) {
    const board: IBoardDescription = {
      title: title,
      description: description,
    }

    this.requestService.createBoard(board).subscribe(
      {
        next: (response: IBoardData) => {
          this._currentBord$$.next(response);
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

  getBoard(id: string): void {

    this.requestService.getBoard(id).subscribe(
      {
        next: (response: IBoardData) => {
          this._currentBord$$.next(response);
        },
        error: (error: HttpErrorResponse) => console.error(error.message),
      }
    );
  }

  upDateBoard(id: string, title: string, description: string): void {
    const body: IBoardUpdate = {
      title: title,
      description: description,
    }

    this.requestService.updateBoard(id, body).subscribe({
      next: (response: IBoardData) => this._currentBord$$.next(response),
      error: (error: HttpErrorResponse) => console.error(error.message)
    });
  }

  deleteBoard(id: string) {
    this.requestService.deleteBoard(id).subscribe({
      next: (response: any) => console.log(response),
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
    this._currentBord$$.next(null);
    this.router.navigateByUrl('main');
  }

  createColumn(boardId: string, title: string, order: number): void {
    const columnData: IColumnsRequestData = {
      title: title,
      order: order,
    }

    this.requestService.createColumn(boardId, columnData).subscribe({
      next: (response) => {
        if (this.currentBord) {
          this.currentBord.columns = response;
          this._currentBord$$.next(this.currentBord);
        }
      },
      error: (error) => console.error(error),
      });
  }

  deleteColumn(columnId: string) {
    if (this.currentBord) {
      const id = this.currentBord.id;
      this.requestService.deleteColumn(this.currentBord.id, columnId).subscribe({
        next: (response) => { () => this.getBoard(id) },
        error: (error) => console.error(error.message),
      });

    }
  }

  changeErrorMessage(errorMessage: IErrorMessage) {
    this._errorMessage$$.next(errorMessage);
  }

  openCreationColumnTaskModal() {
    this._isModalOoen$$.next(true);
  }

  closeCreationColumnTaskModal() {
    this._isModalOoen$$.next(false);
  }

  openConfirmationModal(param: string) {
    this.coreDataService.openConfirmationModal(this.deleteBoard, param);
  }

  OnDestroy() {
    if (this._currentBord$$) {
      this._currentBord$$.unsubscribe()
    }
    if (this._errorMessage$$) {
      this._errorMessage$$.unsubscribe();
    }
  }

}
