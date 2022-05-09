import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { CreateNewItemModalComponent } from './components/create-new-item-modal/create-new-item-modal.component';

const routes: Routes = [{ path: '', component: ProjectManagementComponent }];

@NgModule({
  declarations: [
    ProjectManagementComponent,
    BoardComponent,
    BoardTitleComponent,
    CreateBoardComponent,
    CreateNewItemModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      { path: '', component: ProjectManagementComponent },
      { path: 'board', component: CreateBoardComponent },
      { path: 'board/:id', component: BoardComponent},
    ])
  ],
  exports: [RouterModule],
})

export class ProjectManagementModule {  }
