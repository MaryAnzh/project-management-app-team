import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { IUseRegistrationData } from 'src/app/core/models/request.model';
import { loginFormValidators } from '../../../shared/utils/login-form-validators';
import { AuthService } from '../../services/auth/auth.service';
import { IErrorMessage } from '../../../core/models/respons-error.model';
import { TranslateService } from '@ngx-translate/core';

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
    private authService: AuthService,
    public translate: TranslateService
  ) {

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

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

      const userData: IUseRegistrationData = {
        name: this.registrationForm.value.userName,
        login: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
      };
      this.authService.registration(userData);
    }
  }

}
