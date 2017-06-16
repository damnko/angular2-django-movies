import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  wrongCredentials: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    console.log(this.loginForm);
  }
}
