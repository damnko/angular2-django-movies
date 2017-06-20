import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;

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
    // TODO:
    // https://stackoverflow.com/questions/44631754/how-to-revert-markaspending-in-angular-2-form
    this.loginForm.markAsPending();
    const formData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.us.login(formData)
      .first()
      .catch((err: any) => {
        let formError;
        if (err.status === 401) {
          formError = { wrongPassword: 'Username or password is wrong' };
        } else {
          formError = { formError: 'There was an error during login' };
        }
        this.loginForm.setErrors(formError);

        return Observable.throw(new Error(err));
      }).subscribe(
        res => {
          this.us.setUserData();
          this.router.navigate(['/']);
        },
        err => console.error('Login error', err)
      );
  }
}
