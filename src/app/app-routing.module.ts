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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'customer', component: CustomerComponent, canActivate: [UserresolveGuard]},
  {path: 'manager', component: ManagerComponent, canActivate: [UserresolveGuard]},
  {path: 'engineer', component: EngineerComponent, canActivate: [UserresolveGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [UserresolveGuard], children:[
    {path: 'user/manage', component: UsermanageComponent},
  ]},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
