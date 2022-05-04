import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ConfigService, User } from 'src/app/config/config.service';
import { loginFormValidators } from '../../../shared/utils/login-form-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [
    './login-page.component.scss',
    '../../auth.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  // private _token$$ = new BehaviorSubject<string>('');

  // public token$ = this._token$$.asObservable();

  // token = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private config: ConfigService
    ) {}

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
      const formData = {
        login: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(formData);
      this.signIn(formData);
      // console.log(this.token);
      // this.auth.login(formData.login);
      this.router.navigate(['/project-management']);
    }
  }

  // signIn(user: User): Observable<string> {
  //   return this.config.logIn(user).pipe(
  //     map((res) => res.token)
  //   )
  // }

  signIn(user: User) {
    return this.config.logIn(user).subscribe(
      (resp) => {
      // this.token = resp.token;
      console.log({user: user.login, token: resp.token});
      this.auth.login(user.login, resp.token);
      this.config.getUsers(resp.token).subscribe((res) => console.log(res));
      });
  }
}
