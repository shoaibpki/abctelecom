import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ManagerComponent } from './components/manager/manager.component';
import { EngineerComponent } from './components/engineer/engineer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ShowServicesComponent } from './components/show-services/show-services.component';
import { ComplaintsComponent } from './components/customer/complaints/complaints.component';
import { DetailComponent } from './components/customer/detail/detail.component'
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    UsermanageComponent,
    CustomerComponent,
    ManagerComponent,
    EngineerComponent,
    LogoutComponent,
    ServicesComponent,
    DashboardComponent,
    SignupComponent,
    CarouselComponent,
    HeaderComponent,
    AboutComponent,
    ShowServicesComponent,
    ComplaintsComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
