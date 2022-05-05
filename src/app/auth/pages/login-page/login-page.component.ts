import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { IUserData, Token } from 'src/app/core/models/models';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [
    './login-page.component.scss',
    '../../auth.component.scss']
})

export class LoginPageComponent implements OnInit {

  public visibleError: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private request: RequestService
  ) { }

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

      const formData: IUserData = {
        login: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.signIn(formData);
    }
  }

  signIn(user: IUserData): Subscription {
    return this.request.authorizeUser(user).subscribe(
      (resp: Token) => {
        console.log(user.login, resp.token)
        this.auth.login(user.login, resp.token);
        this.request.getUsers().subscribe((res) => console.log(res));
        this.router.navigate(['/project-management']);
      });
  }
}
