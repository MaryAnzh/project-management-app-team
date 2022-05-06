import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthService } from './auth/services/auth/auth.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () => import('./information/information.module').then(m => m.InformationModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
