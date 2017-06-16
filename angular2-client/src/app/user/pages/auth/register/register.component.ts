import { AsyncFormValidatorsService } from './../../../services/async-form-validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  emailValidator,
  passwordMatchValidator,
  passwordValidator
} from '../../../helpers/form-validators';

@Component({
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  registerForm: FormGroup;
  passwords: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidators: AsyncFormValidatorsService
  ) {
    this.setupForm();
  }

  setupForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required, this.asyncValidators.usernameUnique()],
      email: ['', [Validators.required, emailValidator()]],
      passwords: this.fb.group({
        password: ['', [Validators.required, passwordValidator()]],
        passwordConfirm: ['', Validators.required],
      }, { validator: passwordMatchValidator() })
    });
  }

  submitForm(): void {
    console.log(this.registerForm);
  }
}
