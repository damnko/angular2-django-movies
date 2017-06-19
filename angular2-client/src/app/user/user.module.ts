import { EditComponent } from './pages/edit/edit.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { AuthHomeComponent } from './pages/auth-home/auth-home.component';
import { HintDirective } from './components/input-hint.component';
import { AsyncFormValidatorsService } from './services/async-form-validators.service';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { NgModule } from '@angular/core';

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
