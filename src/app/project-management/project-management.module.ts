import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { ColumnComponent } from './components/column/column.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { TaskComponent } from './components/task/task.component';
import { SearchComponent } from './components/search/search.component';
import { ModalWindowTaskComponent } from './components/modal-window-task/modal-window-task.component';
import { ModalWindowColumnComponent } from './components/modal-window-column/modal-window-column.component';
import { ModalWindowBoardComponent } from './components/modal-window-board/modal-window-board.component';

const routes: Routes = [{ path: '', component: ProjectManagementComponent }];

@NgModule({
  declarations: [
    ProjectManagementComponent,
    BoardComponent,
    BoardTitleComponent,
    CreateBoardComponent,
    ColumnComponent,
    BoardItemComponent,
    TaskComponent,
    SearchComponent,
    ModalWindowTaskComponent,
    ModalWindowColumnComponent,
    ModalWindowBoardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: ProjectManagementComponent },
      { path: 'board', component: CreateBoardComponent },
      { path: 'board/:id', component: BoardComponent},
    ])
  ],
  exports: [RouterModule],
})

export class ProjectManagementModule {  }
