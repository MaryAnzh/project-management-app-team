import { Component, Input } from '@angular/core';
import {IBoardData, ITaskSearchData} from "../../../core/models/request.model";
import {PMDataService} from "../../services/PMData/pmdata.service";
import {BoardsService} from "../../services/boardService/boards.service";
import { RequestService } from 'src/app/core/services/request/request.service';
import { map, mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {

  tasks: ITaskSearchData[] = [];

  @Input() public board: IBoardData | undefined;

  constructor(
    private pmDataService: PMDataService,
    private boardsService: BoardsService,
    private request: RequestService
  ) { }

  goToBoard(id:string): void {
    this.boardsService.goToBoard(id);
    this.getTasksOfBoard(id).subscribe((res) => res);
    console.log(this.tasks);
  }

  getTasksOfBoard(id: string) {
    return this.request.getColumns(id).pipe(
      map((el) => el.map((elem) => elem.id)),
      mergeMap((ids) => ids.map((i) => {
        this.request.getTasks(id, i).subscribe((res) => this.tasks.push(...res));
        return this.tasks;
      }))
    )
  }

  deleteOnClick(id:string):void {
    this.boardsService.showConfirmationModalBoardItem(id)
  }
}
