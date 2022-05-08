import { Injectable } from '@angular/core';
import { IBoardCreation, IBoardData } from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IErrorMessage } from 'src/app/core/models/respons-error.model';

@Injectable({
  providedIn: 'root'
})

export class PMDataService {
  private _currentBordId: string = '';
  private _errorMessage$$ = new Subject<IErrorMessage>();

  public errorMessage$ = this._errorMessage$$.asObservable();


  constructor(
    private requestService: RequestService,
    private router: Router
  ) {
  }

  createBoard(title: string) {
    const board: IBoardCreation = {
      title: title,
    }

    this.requestService.createBoard(board).subscribe(
      {
        next: (response: IBoardData) => {
          this._currentBordId = response.id;
          this.router.navigateByUrl(`/board/${response.id}`);
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

  changeErrorMessage(errorMessage: IErrorMessage) {
    this._errorMessage$$.next(errorMessage);
  }
}
