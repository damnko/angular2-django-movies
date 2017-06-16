import { AuthHomeComponent } from './pages/auth-home/auth-home.component';
import { HintDirective } from './components/input-hint.component';
import { AsyncFormValidatorsService } from './services/async-form-validators.service';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterEditComponent } from './pages/register-edit/register-edit.component';
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
    RegisterEditComponent,
    UserHomeComponent,
    HintDirective,
    AuthHomeComponent
  ],
  providers: [
    AsyncFormValidatorsService
  ]
})
export class UserModule { }
