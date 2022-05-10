import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { CreateNewItemModalComponent } from './components/create-new-item-modal/create-new-item-modal.component';
import { ColumnComponent } from './components/column/column.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ProjectManagementComponent }];

@NgModule({
  declarations: [
    ProjectManagementComponent,
    BoardComponent,
    BoardTitleComponent,
    CreateBoardComponent,
    CreateNewItemModalComponent,
    ColumnComponent,
    EditProfileComponent,
    ProfileFormComponent
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
      { path: 'users/:id', component: EditProfileComponent},
    ])
  ],
  exports: [RouterModule],
})

export class ProjectManagementModule {  }
