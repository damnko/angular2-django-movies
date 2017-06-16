import { ActivatedRoute } from '@angular/router';
import { AsyncFormValidatorsService } from './../../services/async-form-validators.service';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  emailValidator,
  passwordMatchValidator,
  passwordValidator
} from '../../helpers/form-validators';

@Component({
  styleUrls: ['./register-edit.component.scss'],
  templateUrl: './register-edit.component.html'
})

export class RegisterEditComponent implements OnInit {
  isEdit: boolean = true;
  actionName = this.isEdit ? 'Update' : 'Register';

  registerForm: FormGroup;
  passwords: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidators: AsyncFormValidatorsService,
    private route: ActivatedRoute
  ) {
    this.route.data
      .first()
      .map(data => data.edit)
      .subscribe(isEdit => {
        this.isEdit = isEdit;
        this.setupForm();
      });
  }

  ngOnInit() {
    return true;
  }

  setupForm(): void {
    const passwordGroup = this.fb.group({
        password: ['', [Validators.required, passwordValidator()]],
        passwordConfirm: ['', Validators.required],
      }, { validator: passwordMatchValidator() });

    this.registerForm = this.fb.group({
      username: [
        { value: '', disabled: this.isEdit },
        Validators.required,
        this.asyncValidators.usernameUnique()
      ],
      email: ['', [Validators.required, emailValidator()]],
      passwords: passwordGroup
    });
    if (this.isEdit) {
      const control: FormControl = new FormControl('', Validators.required);
      passwordGroup.addControl('oldPassword', control);
    }
  }

  submitForm(): void {
    console.log(this.registerForm);
  }
}
