import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';
import { UserresolveGuard } from './guard/userresolve.guard';
import { CustomerComponent } from './components/customer/customer.component';
import { AppComponent } from './app.component';
import { ManagerComponent } from './components/manager/manager.component';
import { EngineerComponent } from './components/engineer/engineer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'customer', component: CustomerComponent, canActivate: [UserresolveGuard]},
  {path: 'manager', component: ManagerComponent, 
  canActivate: [UserresolveGuard]},
  {path: 'engineer', component: EngineerComponent, canActivate: [UserresolveGuard]},
  {path: 'admin', component: AdminComponent, 
  canActivate: [UserresolveGuard], children:[
    {path: 'dashboard', component: DashboardComponent},
    {path: 'manage/customers', component: UsermanageComponent},
    {path: 'manage/managers', component: UsermanageComponent},
    {path: 'manage/engineers', component: UsermanageComponent},
    {path: 'manage/services', component: ServicesComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
  ]},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
