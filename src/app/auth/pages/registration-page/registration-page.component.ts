import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserData, Token, User } from 'src/app/core/models/models';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loginFormValidators } from '../../../shared/utils/login-form-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss', '../../auth.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public visibleError: boolean = true;

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private request: RequestService
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
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
    return <AbstractControl>this.loginForm.get('userName');
  }

  get email(): AbstractControl {
    return <AbstractControl>this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.loginForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return <AbstractControl>this.loginForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const formData: IUserData = {
        name: this.loginForm.value.userName,
        login: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.addUser(formData);
      // this.signIn(formData);
      this.router.navigate(['/auth/login']);
    }
  }

  goToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }

  addUser(user: IUserData): Subscription {
    return this.request.createUser(user).subscribe((resp: User) => {
      console.log(resp)
      this.router.navigate(['/auth/login']);
    });
  }

  signIn(user: IUserData): Subscription {
    return this.request.authorizeUser(user).subscribe(
      (resp: Token) => {
      this.auth.login(user.login, resp.token);
      // this.router.navigate(['/auth/login']);
      });
  }

}
