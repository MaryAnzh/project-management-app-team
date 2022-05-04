import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  passwordValue: string = 'asd'

  constructor(private router: Router, private auth: AuthService) { }

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
      // console.log(formData);
      const name = 'Dima'
      this.auth.login(name);
      this.router.navigate(['/project-management']);
    }
  }

  goToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  }

}
