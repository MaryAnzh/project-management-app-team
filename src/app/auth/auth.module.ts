import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { AuthComponent } from './auth.component';
import { PopUpAuthErrorComponent } from './components/pop-up-auth-error/pop-up-auth-error.component';

@NgModule({
  declarations: [LoginPageComponent,
    RegistrationPageComponent,
    AuthComponent,
    PopUpAuthErrorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent },
      {
        path: '', component: AuthComponent, children: [
          { path: 'login', component: LoginPageComponent },
          { path: 'registration', component: RegistrationPageComponent },
        ]
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthModule { }
