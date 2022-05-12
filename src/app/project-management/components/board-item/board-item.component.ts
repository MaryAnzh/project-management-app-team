import { Component, Input } from '@angular/core';
import {IBoardData} from "../../../core/models/request.model";
import {PMDataService} from "../../services/PMData/pmdata.service";
import {BoardsService} from "../../services/boardService/boards.service";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {

  @Input() public board: IBoardData | undefined;

  constructor(
    private pmDataService: PMDataService,
    private boardsService: BoardsService
  ) { }

  goToBoard(id:string): void {
    this.boardsService.goToBoard(id);
  }

  deleteBoardItem(id:string): void {
    this.boardsService.deleteBoardItem(id);
  }
}
