import { Observable } from 'rxjs/Rx';
import { UserService } from './../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncFormValidatorsService } from './../../services/async-form-validators.service';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
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
    private asyncValidators: AsyncFormValidatorsService,
    private route: ActivatedRoute,
    private us: UserService,
    private router: Router
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

    this.passwordForm = this.fb.group({});
  }

  updateProfile(): void {
    this.success.profile = false;
    // TODO:
    // https://stackoverflow.com/questions/44631754/how-to-revert-markaspending-in-angular-2-form
    this.updateProfileForm.markAsPending();
    const formData = {
      username: this.updateProfileForm.value.username,
      email: this.updateProfileForm.value.email
    };

    this.us.editProfile(formData)
      .first()
      .subscribe(
        res => {
          console.log('res anyway');
          this.success.profile = true;
          this.us.setUserData();
          this.updateProfileForm.markAsPristine();
        },
        err => {
          console.error('Registration form error', err);
          this.updateProfileForm.setErrors({
            formError: true
          });
        }
      );
  }

  updatePassword(): void {
    console.log(this.passwordForm);
    this.success.password = false;
    // TODO:
    // https://stackoverflow.com/questions/44631754/how-to-revert-markaspending-in-angular-2-form
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
        },
        err => {
          console.error('Registration form error', err);
        }
      );
  }
}
