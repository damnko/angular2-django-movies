import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { UserService } from './../../../core/services';
import { AsyncFormValidatorsService } from './../../services/async-form-validators.service';
import {
  emailValidator,
  passwordMatchValidator,
  passwordValidator
} from '../../helpers/form-validators';

@Component({
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  formError: boolean = false;
  formLoading: boolean = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidators: AsyncFormValidatorsService,
    private us: UserService,
    private router: Router
  ) {
    this.setupForm();
  }

  setupForm(): void {
    this.registerForm = this.fb.group({
      username: [
        '',
        Validators.required,
        this.asyncValidators.usernameUnique()
      ],
      email: ['', [Validators.required, emailValidator()]]
    });
  }

  submitForm(): void {
    this.formLoading = true;
    const formData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords.password
    };

    this.us.register(formData)
      .first()
      .finally(() => this.formLoading = false)
      .subscribe(
        res => {
          this.us.setUserData();
          this.router.navigate(['/']);
        },
        err => {
          this.formError = true;
        }
      );
  }
}
