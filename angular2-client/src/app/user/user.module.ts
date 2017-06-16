import { AuthHomeComponent } from './pages/auth/auth-home/auth-home.component';
import { HintDirective } from './components/input-hint.component';
import { AsyncFormValidatorsService } from './services/async-form-validators.service';
import { UserHomeComponent } from './pages/user-home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
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
    AuthHomeComponent
  ],
  providers: [
    AsyncFormValidatorsService
  ]
})
export class UserModule { }
