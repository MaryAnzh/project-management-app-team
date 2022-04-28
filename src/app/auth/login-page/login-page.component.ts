import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../my-validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        MyValidators.digitValidator,
        MyValidators.lowercaseValidator,
        MyValidators.uppercaseValidator,
        MyValidators.symbolsValidator,
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
      const formData = this.loginForm.value;
      console.log(formData);

      this.loginForm.reset();
    }
  }

  goToRegistrationPage(): void {
    this.router.navigate(['/auth/registration']);
  }

}
