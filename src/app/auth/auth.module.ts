import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthModule { }
