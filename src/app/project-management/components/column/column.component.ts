import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PMDataService } from '../../services/PMData/pmdata.service';
import { IColumnsData, ITaskData } from 'src/app/core/models/request.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent {

  @Input() public column: IColumnsData | undefined;

  public isTitleChange: boolean = false;


  constructor(private pmDataService: PMDataService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  drop(event: CdkDragDrop<ITaskData[]>): void {
    if (this.column && this.column.tasks) {
      const tasks = this.column.tasks;
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      const boardId = this.pmDataService.currentBoard.id;
      const columnid = this.column ? this.column.id : '';
      this.pmDataService.droptasksByOrder(tasks, boardId, columnid);
    }
  }

  blur(): void {
    setTimeout(() => { this.isTitleChange = false }, 400);
  }

  changeColumnTitle(value: string): void {
    if (this.column && this.column.title !== value) {
      this.pmDataService.updateColumns(this.column.id, value, this.column.order);
    }

    this.isTitleChange = false;
  }

  deleteColumnOnCkick(): void {
    if (this.column) {
      const name = 'column';
      this.pmDataService.showConfirmationModal(name, this.column.id);

    }
  }

}
