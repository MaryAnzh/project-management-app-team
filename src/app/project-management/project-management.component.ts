import {Component, Input} from '@angular/core';
import {BoardsService} from "./services/boardService/boards.service";
import {SubscriptionLike} from "rxjs";
import {IBoardData} from "../core/models/request.model";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent  {

  public boardInfo$: SubscriptionLike;

  public boardInfo: IBoardData[] | null = null;

  @Input() public board: IBoardData | undefined;

  constructor(
    private boardsService: BoardsService
  ) {
    this.boardInfo$ = this.boardsService.allBoards$.subscribe(
      (data) => this.boardInfo = data)
  }



}
