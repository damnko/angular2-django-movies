import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import {
  emailValidator,
  passwordMatchValidator,
  passwordValidator
} from '../../helpers/form-validators';

@Component({
  selector: 'password-form',
  styleUrls: ['./password-form.component.scss'],
  templateUrl: './password-form.component.html'
})

export class PasswordFormComponent implements OnInit {
  @Input() sourceForm: FormGroup;
  @Input() isEdit = false;
  passwords: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.passwords = this.fb.group({
      password: ['', [Validators.required, passwordValidator()]],
      passwordConfirm: ['', Validators.required],
    }, { validator: passwordMatchValidator() });

    this.sourceForm.setControl('passwords', this.passwords);

    // add oldPassword control on edit form
    if (this.isEdit) {
      const control: FormControl = new FormControl('', Validators.required);
      this.passwords.addControl('oldPassword', control);
    }
  }
}
