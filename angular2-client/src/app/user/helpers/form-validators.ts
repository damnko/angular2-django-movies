import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const email = control.value;
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = emailRe.test(email);
    return valid ? null : { emailInvalid: true };
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const password = control.get('password').value;
    const passwordConfirm = control.get('passwordConfirm').value;
    const valid = (password === passwordConfirm);

    return valid ? null : { passwordMismatch: true };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const password = control.value;

    const errors: any = {};

    if (password.length < 7) {
      errors['tooShort'] = true;
    }
    if (!/[A-Z]+/.test(password)) {
      errors['noCapitalLetter'] = true;
    }
    if (/^[a-zA-Z0-9]+$/.test(password) || password.length === 0) {
      errors['noSpecialChars'] = true;
    }

    const valid = Object.keys(errors).length === 0;
    return valid ? null : errors;
  };
}

