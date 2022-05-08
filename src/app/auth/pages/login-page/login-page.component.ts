import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { IUserLoginData, Token } from 'src/app/core/models/request.model';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AuthService } from '../../services/auth/auth.service';
import { IErrorMessage } from '../../../core/models/respons-error.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [
    './login-page.component.scss',
    '../../auth.component.scss']
})

export class LoginPageComponent implements OnInit {
  public errorMessage$: SubscriptionLike;
  public errorMessage: string = '';
  public visibleError: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService
  ) {

    this.errorMessage$ = this.authService.errorMessage$.subscribe(
      (value: IErrorMessage) => {
        this.visibleError = value.isError;
        this.errorMessage = value.errorMessage;
      }
    )
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  get email(): AbstractControl {
    return <AbstractControl>this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const userData: IUserLoginData = {
        login: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(userData);
    }
  }

}
