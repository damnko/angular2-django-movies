import { AuthHomeComponent } from './pages/auth/auth-home/auth-home.component';
import { UserHomeComponent } from './pages/user-home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserHomeComponent, children: [
    { path: '', component: AuthHomeComponent, children: [
      { path: '', redirectTo: 'register' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
