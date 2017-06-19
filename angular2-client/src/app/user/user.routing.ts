import { NonAuthGuard } from './../core/services/non-auth-guard.service';
import { AuthGuard } from './../core/services/auth-guard.service';
import { EditComponent } from './pages/edit/edit.component';
import { AuthHomeComponent } from './pages/auth-home/auth-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
