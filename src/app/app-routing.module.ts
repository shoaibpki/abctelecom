import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';
import { UserresolveGuard } from './guard/userresolve.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [UserresolveGuard], children:[
    {path: 'user/manage', component: UsermanageComponent},
  ]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
