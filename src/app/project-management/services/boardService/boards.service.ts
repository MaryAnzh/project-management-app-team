import {Injectable, OnInit} from '@angular/core';
import {IBoardData} from "../../../core/models/request.model";
import {BehaviorSubject, Subject} from "rxjs";
import {RequestService} from "../../../core/services/request/request.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {CoreDataService} from "../../../core/services/coreData/core-data.service";

@Injectable({
  providedIn: 'root'
})

export class BoardsService implements OnInit {

  // private _allBoards$$ = new Subject<IBoardData[] | null>();
  private _allBoards$$ = new Subject<IBoardData[] | null>();

  public allBoards$ = this._allBoards$$.asObservable();

  constructor(
    private requestService: RequestService,
    private coreDataService: CoreDataService,
    private router: Router
  ) {this.getAllBoards()}

  getAllBoards():void {
    this.requestService.getBoards().subscribe({
      next: (response: IBoardData[]) => {
        this._allBoards$$.next(response);
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    })
  }


  goToBoard(id: string): void {
    this.requestService.getBoard(id).subscribe(
      {
        next: (response: IBoardData) => {
          this.router.navigateByUrl(`main/board/${response.id}`);
        },
        error: (error: HttpErrorResponse) => console.error(error.message),
      }
    )
  }

  deleteBoardItem(id: string): void {
    this.requestService.deleteBoard(id).subscribe({
      next: (response: any) => {
        this.getAllBoards();
      },
      error: (error: HttpErrorResponse) => console.error(error.message),

    });
  }

  showConfirmationModalBoardItem(id:string):void {
    const res = this.coreDataService.openConfirmationModal().then(() => {
       this.deleteBoardItem(id);
    })
      .catch(() => {})
  }

  onDistroy():void {
    if (this._allBoards$$) {
      this._allBoards$$.unsubscribe();
    }
  }

  ngOnInit():void {
    this.getAllBoards();
  }
}
