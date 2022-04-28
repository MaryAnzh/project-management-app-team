import { FormControl } from '@angular/forms';

export class MyValidators {
  static digitValidator(control: FormControl): { [key: string]: boolean } | null {
    const digitRgEx: RegExp = /^(?=(.*[\\\d])).{1,}$/;

    const valid = !control.value || digitRgEx.test(control.value);
    return valid ? null : { digitValidator: true };
  }

  static lowercaseValidator(control: FormControl): { [key: string]: boolean } | null {
    const lowercaseRgEx: RegExp = /^(?=(.*[a-z])).{1,}$/;

    const valid = !control.value || lowercaseRgEx.test(control.value);
    return valid ? null : { lowercaseValidator: true };
  }

  static uppercaseValidator(control: FormControl): { [key: string]: boolean } | null {
    const uppercase: RegExp = /^(?=.*?[A-Z]).{1,}$/;

    const valid = !control.value || uppercase.test(control.value);
    return valid ? null : { uppercaseValidator: true };
  }

  static symbolsValidator(control: FormControl): { [key: string]: boolean } | null {
    const symbolsRgEx: RegExp = /^(?=.*?[!@#$%^&*()]).{1,}$/;

    const valid = !control.value || symbolsRgEx.test(control.value);
    return valid ? null : { symbolsValidator: true };
  }

  static ValidateUrl(control: FormControl): { [key: string]: boolean } | null {
    const urlRgEx =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    const valid = !control.value || urlRgEx.test(control.value);
    return valid ? null : { invalidUrl: true };
  }
}
