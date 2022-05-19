import { Component, OnInit, Input } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IBoardData, IColumnsData } from 'src/app/core/models/request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, SubscriptionLike, map, pipe } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  public boardInfo$: SubscriptionLike;

  public boardInfo: IBoardData = { id: '', title: '', description: '', columns: [] };

  public columns: IColumnsData[] | undefined = undefined;

  public isTitleChange: boolean = false;

  public boardId: string | null = null;

  public isNewColunmWindowOpen$: Observable<boolean>;

  public isNewTaskWindowOpen$: Observable<boolean>;

  constructor(
    private pmDataService: PMDataService,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {

    this.boardInfo$ = this.pmDataService.currentBoard$.subscribe(
      (value) => {
        // console.log('subscribe board работает');
        this.boardInfo = value ? value : {id: '', title: '', description: ''};
        this.columns = this.boardInfo.columns ? this.boardInfo.columns : [];
      }
    )

    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id;
    if (id) {
      this.pmDataService.getBoard(id);
    }

    this.isNewColunmWindowOpen$ = this.pmDataService.isNewColunmWindowOpen$;
    this.isNewTaskWindowOpen$ = this.pmDataService.isNewTaskWindowOpen$;

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  drop(event: CdkDragDrop<IColumnsData[]>): void {
    if (this.boardInfo && this.boardInfo.columns) {
      const column = this.boardInfo.columns;
      moveItemInArray(column, event.previousIndex, event.currentIndex);
    }
  }

  makeButtonVisible(): void {
    this.isTitleChange = true;
  }

  makeButtonHidden(): void {
    setTimeout(() => this.isTitleChange = false, 300);
  }

  changeTitleOnClick(value: string): void {
    this.isTitleChange = false;

    if (this.boardId
      && this.boardInfo
      && this.boardInfo.title !== value) {

      this.pmDataService.upDateBoard(this.boardId, value, this.boardInfo.description);
    }
  }

  cancelChangeTitleOnClick(e: HTMLInputElement): void {
    this.isTitleChange = false;
    this.inputValue();
  }

  inputValue(): string {
    return this.boardInfo?.title;
  }

  deleteBoardOnClikc(): void {
    const name = 'board';
    if (this.boardId) {
      this.pmDataService.showConfirmationModal(name);
    }
  }

  newColumnOnClick(): void {
    this.pmDataService.showNewColumnModal();
  }

  newTaskOnClick(): void {
    this.pmDataService.showNewTaskModal();
  }


  OnDestroy(): void {
    if (this.boardInfo$) {
      this.boardInfo$.unsubscribe()
    }
  }
}
