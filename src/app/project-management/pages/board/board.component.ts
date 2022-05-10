import { Component, OnInit, Input } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IBoardData } from 'src/app/core/models/request.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  public boardInfo: IBoardData | null = null;
  public isTitleChange: boolean = false;
  public boardId: string | null = null;

  public ismodalOpen$: Observable<boolean>;
  @Input() public modalName: string = '';

  constructor(private pmDataService: PMDataService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id;
    if (id) {
      this.boardInfo = this.pmDataService.getBoard(id);
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
    if (this.boardId && this.boardInfo) {

      const upDate: IBoardData | null = this.pmDataService.upDateBoard(this.boardId, value, this.boardInfo.description);
      if (upDate) {
        this.boardInfo.title = upDate.title;
      }
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
    const isModalOpen = true;
    this.pmDataService.changeModalOoen(isModalOpen);
  }

}
}
