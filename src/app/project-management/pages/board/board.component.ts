import { Component, OnInit, Input } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IBoardData, IColumnsData } from 'src/app/core/models/request.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, SubscriptionLike, map, pipe } from 'rxjs';
import { I18nMetaVisitor } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  public boardInfo$: SubscriptionLike;
  public boardInfo: IBoardData | null = null;
  public columns: IColumnsData[] | undefined = undefined;

  public isTitleChange: boolean = false;
  public boardId: string | null = null;

  public ismodalOpen$: Observable<boolean>;
  @Input() public modalName: string = '';

  constructor(private pmDataService: PMDataService,
    private route: ActivatedRoute
  ) {

    this.boardInfo$ = this.pmDataService.currentBord$.subscribe(
      (value) => {
        this.boardInfo = value;
        this.columns = value?.columns;
      }
    )

    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id;
    if (id) {
      this.pmDataService.getBoard(id);
    }

    this.ismodalOpen$ = this.pmDataService.isModalOoen$;
  }

  makeButtonVisible() {
    this.isTitleChange = true;
  }

  makeButtonHidden() {
    setTimeout(() => this.isTitleChange = false, 300);
  }

  changeTitleOnClick(value: string) {
    this.isTitleChange = false;

    if (this.boardId
      && this.boardInfo
      && this.boardInfo.title !== value) {

      this.pmDataService.upDateBoard(this.boardId, value, this.boardInfo.description);
    }
  }

  cancelChangeTitleOnClick(e: HTMLInputElement) {
    this.isTitleChange = false;
    this.inputValue();
  }

  inputValue() {
    return this.boardInfo?.title;
  }

  deleteBoardOnClikc() {
    if (this.boardId) {
      this.pmDataService.openConfirmationModal(this.boardId);

      //this.pmDataService.deleteBoard(this.boardId);
    }
  }

  newColumnOnClick(e: Event) {
    const elem = <HTMLElement>e.target;
    const elemType = elem.dataset['type'];

    if (elemType) {
      this.modalName = elemType;
      this.pmDataService.openCreationColumnTaskModal();
    }

  }

  OnDestroy() {
    if (this.boardInfo$) {
      this.boardInfo$.unsubscribe()
    }
  }
}
