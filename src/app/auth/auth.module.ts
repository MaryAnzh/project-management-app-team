import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthModule { }
