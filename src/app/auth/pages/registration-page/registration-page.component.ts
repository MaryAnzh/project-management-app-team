import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService, User } from 'src/app/config/config.service';
import { loginFormValidators } from '../../../shared/utils/login-form-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss', '../../auth.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  loginForm!: FormGroup;

  passwordValue: string = 'asd'

  constructor(
    private router: Router,
    private auth: AuthService,
    private config: ConfigService
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
      // const formData = this.loginForm.value;
      const formData = {
        name: this.loginForm.value.userName,
        login: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(formData);
      const name = 'Dima'
      // this.auth.login(name);
      this.addUser(formData);
      // this.signIn(formData);
      this.router.navigate(['/project-management']);
    }
  }

  goToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }

  getResponse() {
    return this.config.getConfig().subscribe((resp) => console.log(resp));
  }

  addUser(user: User) {
    return this.config.createUser(user).subscribe((resp) => console.log(resp));
  }

  signIn(user: User) {
    return this.config.logIn(user).subscribe(
      (resp) => {
      // this.token = resp.token;
      console.log({user: user.login, token: resp.token});
      this.auth.login(user.login, resp.token);
      });
  }

}
