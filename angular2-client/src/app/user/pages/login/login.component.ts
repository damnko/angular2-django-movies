import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
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
    private fb: FormBuilder,
    private us: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    console.log(this.loginForm);
    const formData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.us.login(formData)
      .first()
      .subscribe(
        res => {
          console.log('ok login fatto');
          this.us.setUserData();
          this.router.navigate(['/']);
        },
        err => console.error('error', err)
      );
  }
}
