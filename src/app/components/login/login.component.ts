import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(
    private userService: UserService, 
    private route: Router,
    private services: ServicesService){}

  @ViewChild('loginForm') form!: NgForm;

  ngOnInit(): void {
    this.services.getFullServices().subscribe((srv) => {
      srv.forEach((service) => this.services.setService(service))
    })
    this.userService.getHttpUsers()
    .subscribe((users) => {
      users.forEach((user) => this.userService.setUsers(user));
    });
  }

  onSubmit(){
    let email = this.form.value['email'];
    let password = this.form.value['password'];
    this.userService.login(email, password)
    .subscribe({
      next: user => {
        switch (user.role){
          case 'ADMIN': {
            this.userService.setAdmin(user);
            this.route.navigate(['admin']);
              break;
          }
          case 'CUSTOMER':{
            this.userService.setAdmin(user);
            this.route.navigate(['customer']);
              break;  
          }
          case 'MANAGER':{
            this.userService.setAdmin(user);
            this.route.navigate(['manager']);
              break;  
          }
          case 'ENGINEER':{
            this.userService.setAdmin(user);
            this.route.navigate(['admin']);
              break;  
          }
        }
        this.userService.isLogin = true; 
        this.errorMessage = '';
      },
      error: err => { 
        this.errorMessage = err['error'].message; 
        // if (this.errorMessage = ''){
        //   this.errorMessage = "Database not Started!"
        // }
      }
    });
  }


}
