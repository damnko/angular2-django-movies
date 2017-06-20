import { NgModule } from '@angular/core';

import { AsyncFormValidatorsService } from './services/async-form-validators.service';
import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import {
  EditComponent,
  AuthHomeComponent,
  LoginComponent,
  UserHomeComponent,
  RegisterComponent,
} from './pages';
import {
  PasswordFormComponent,
  HintDirective
} from './components';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    HintDirective,
    AuthHomeComponent,
    PasswordFormComponent,
    EditComponent
  ],
  providers: [
    AsyncFormValidatorsService
  ]
})
export class UserModule { }
