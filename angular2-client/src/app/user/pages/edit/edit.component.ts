import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html'
})

export class EditComponent {
  updateProfileForm: FormGroup;
  passwordForm: FormGroup;
  success = {
    profile: false,
    password: false
  };

  constructor(
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.setupForm();
  }

  setupForm(): void {
    this.updateProfileForm = this.fb.group({
      username: [
        { value: '', disabled: true },
        Validators.required
      ],
      email: ['', [Validators.required, emailValidator()]]
    });

    this.us.user$.first()
      .subscribe(user => {
        this.updateProfileForm.patchValue({
          username: user.username,
          email: user.email
        });
      });

    // create empty formGroup that will be populated by password-form component
    this.passwordForm = this.fb.group({});
  }

  updateProfile(): void {
    this.success.profile = false;
    this.updateProfileForm.markAsPending();
    const formData = {
      username: this.updateProfileForm.value.username,
      email: this.updateProfileForm.value.email
    };

    this.us.editProfile(formData)
      .first()
      .subscribe(
        res => {
          this.success.profile = true;
          this.us.setUserData();
          // by using setErrors I can revert the markAsPending state
          this.updateProfileForm.setErrors({});
        },
        err => {
          this.updateProfileForm.setErrors({
            formError: true
          });
        }
      );
  }

  updatePassword(): void {
    this.success.password = false;
    this.passwordForm.markAsPending();
    const formData = {
      oldPassword: this.passwordForm.value.passwords.oldPassword,
      password: this.passwordForm.value.passwords.password
    };

    this.us.editPassword(formData)
      .first()
      .catch((err: any) => {
        let formError;
        if (err.status === 401) {
          formError = { wrongPassword: true };
        } else {
          formError = { formError: true };
        }
        this.passwordForm.setErrors(formError);

        return Observable.throw(new Error(err));
      })
      .subscribe(
        res => {
          this.success.password = true;
          this.us.setUserData();
          // by using setErrors I can revert the markAsPending state
          this.passwordForm.setErrors({});
        }
      );
  }
}
