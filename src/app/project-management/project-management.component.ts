import {Component, Input, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BoardsService} from "./services/boardService/boards.service";
import {SubscriptionLike} from "rxjs";
import {IBoardData} from "../core/models/request.model";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  public boardInfo$: SubscriptionLike;

  public boardInfo: IBoardData[] | null = null;

  @Input() public board: IBoardData | undefined;

  constructor(
    private boardsService: BoardsService,
    public translate: TranslateService
  ) {
    this.boardInfo$ = this.boardsService.allBoards$.subscribe(
      (data) => this.boardInfo = data)

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  ngOnInit():void {
    this.boardsService.getAllBoards();
  }

}
