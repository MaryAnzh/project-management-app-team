import { Component, OnInit } from '@angular/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IBoardData } from 'src/app/core/models/request.model';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  public boardInfo: IBoardData | null = null;
  public isTitleChange: boolean = false;
  public boardId: string | null = null;

  constructor(private pmDataService: PMDataService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.boardId = id;
    if (id) {
      this.boardInfo = this.pmDataService.getBoard(id);
    }
  }

  changeTitleInput(title: string) {
    this.isTitleChange = true;
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
}
