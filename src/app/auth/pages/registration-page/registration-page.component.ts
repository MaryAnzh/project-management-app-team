import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
import { IUserData, Token, User } from 'src/app/core/models/models';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loginFormValidators } from '../../../shared/utils/login-form-validators';
import { AuthService } from '../../services/auth/auth.service';
import { IErrorMessage } from '../../model/respons-error.model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss', '../../auth.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public errorMessage$: SubscriptionLike;
  public errorMessage: string = '';
  public visibleError: boolean = false;

  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private request: RequestService
  ) {

    this.errorMessage$ = this.authService.errorMessage$.subscribe(
      (value: IErrorMessage) => {
        this.visibleError = value.isError;
        this.errorMessage = value.errorMessage;
      }
    )
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [Validators.email, Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        loginFormValidators.digitValidator,
        loginFormValidators.lowercaseValidator,
        loginFormValidators.uppercaseValidator,
        loginFormValidators.symbolsValidator,
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
      ]),
    },
      {
        validators: (control) => {
          if (control.value.password !== control.value.confirmPassword) {
            (<AbstractControl>control.get('confirmPassword')).setErrors({ notSame: true });
          }
          return null
        }
      }
    );
  }

  get userName(): AbstractControl {
    return <AbstractControl>this.registrationForm.get('userName');
  }

  get email(): AbstractControl {
    return <AbstractControl>this.registrationForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.registrationForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return <AbstractControl>this.registrationForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {

      const userData: IUserData = {
        name: this.registrationForm.value.userName,
        login: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
      };

      this.authService.registration(userData);

      //this.router.navigate(['/auth/login']);
    }
  }

  goToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }

  // addUser(user: IUserData): Subscription {
  //   return this.request.createUser(user).subscribe((resp: User) => {
  //     console.log(resp)
  //     this.router.navigate(['/auth/login']);
  //   });
  // }

  signIn(user: IUserData): Subscription {
    return this.request.authorizeUser(user).subscribe(
      (resp: Token) => {
        this.authService.login(user.login, resp.token);
        // this.router.navigate(['/auth/login']);
      });
  }

}
