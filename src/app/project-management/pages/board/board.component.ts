import { Component, OnInit, Input } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IBoardData } from 'src/app/core/models/request.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

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
    setTimeout(() => this.isTitleChange = false, 500);

    console.log('блур сработал')
  }

  changeTitleOnClick(value: string) {
    this.isTitleChange = false;
    if (this.boardId) {
      const upDate: IBoardData | null = this.pmDataService.upDateBoard(this.boardId, value);
      if (upDate && this.boardInfo) {
        this.boardInfo.title = upDate.title
      }
    }


  }

  deleteBoardOnClikc() {
    if (this.boardId) {
      this.pmDataService.deleteBoard(this.boardId);
    }
  }

  newBoardOnClick() {
    this.modalName = 'Column';
    const isModalOpen = true;
    this.pmDataService.changeModalOoen(isModalOpen);
  }
}
