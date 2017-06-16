import { AuthHomeComponent } from './pages/auth-home/auth-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RegisterEditComponent } from './pages/register-edit/register-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserHomeComponent, children: [
    { path: '', component: AuthHomeComponent, children: [
      { path: '', redirectTo: 'register' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterEditComponent }
    ]},
    { path: 'edit', component: RegisterEditComponent, data: { edit: true } }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
