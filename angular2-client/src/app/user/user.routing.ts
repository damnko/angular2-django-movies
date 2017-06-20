import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonAuthGuard } from './../core/services/non-auth-guard.service';
import { AuthGuard } from './../core/services/auth-guard.service';
import {
  AuthHomeComponent,
  EditComponent,
  LoginComponent,
  RegisterComponent,
  UserHomeComponent
} from './pages';

const routes: Routes = [
  { path: '', component: UserHomeComponent, children: [
    { path: '', component: AuthHomeComponent, canActivateChild: [NonAuthGuard], children: [
      { path: '', redirectTo: 'register' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]},
    { path: 'edit', component: EditComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
