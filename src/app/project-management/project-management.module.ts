import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectManagementComponent }];

@NgModule({
  declarations: [
    ProjectManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProjectManagementComponent }
    ])
  ],
  exports: [RouterModule],
})

export class ProjectManagementModule {  }
