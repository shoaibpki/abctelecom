import { User } from './../../interface/user';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, Subscribable, Subscriber, Subscription } from 'rxjs';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';
import * as _ from 'underscore';
import { ComplaintService } from 'src/app/service/complaint.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  
  constructor(
    private userService: UserService, 
    private route: Router,
    private complaintService: ComplaintService,
    private services: ServicesService){}

  @ViewChild('loginForm') form!: NgForm;

  subs: Subscription[]=[];

  ngOnInit(): void {
    // this.subs.push(
    // this.services.getFullServices().subscribe((srv) => {
    //   srv.forEach((service) => this.services.setService(service))
    // }))
    // this.subs.push(
    // this.userService.getHttpUsers()
    // .subscribe((users) => {
    //   users.forEach((user) => this.userService.setUsers(user));
    // }));
  }


  // onSubmit(){
  //   let email = this.form.value['email'];
  //   this.userService.password = this.form.value['password'];
  //   this.subs.push(
  //   this.userService.login(email)
  //   .subscribe({
  //     next: user => {
  //       switch (user.role){
  //         case 'ADMIN': {
  //           this.userService.setAdmin(user);
  //           this.userService.getHttpUsers(email).subscribe({ 
  //             next: users => {
  //               users.forEach((user) => this.userService.setUsers(user))
  //               console.log(this.userService.getUsers())
  //               this.route.navigate(['admin']);
  //             },
  //             error: error => {
  //               console.log(error.msg)
  //             }
  //           });
  //             break;
  //         }
  //         case 'CUSTOMER':{
  //           this.userService.setAdmin(user);
  //           this.route.navigate(['customer']);
  //             break;  
  //         }
  //         case 'MANAGER':{
  //           this.userService.setAdmin(user);
  //           this.route.navigate(['manager']);
  //             break;  
  //         }
  //         case 'ENGINEER':{
  //           this.userService.setAdmin(user);
  //           this.route.navigate(['engineer']);
  //             break;  
  //         }
  //       }
  //       this.userService.isLogin = true; 
  //       this.errorMessage = '';
  //     },
  //     error: err => { 
  //       this.errorMessage = err['error'].message; 
  //       // if (this.errorMessage = ''){
  //       //   this.errorMessage = "Database not Started!"
  //       // }
  //     }
  //   }));
  // }

  onSubmit(){
    let admin: User = this.userService.getAdmin();
    let email = this.form.value.email;
    let pass = this.form.value.password;
      if ( email === 'admin@abc.com' && pass == '123'){
        this.userService.setAdmin({
          role:  'ADMIN',
          userName: 'Admin',
          email: 'admin@abc.com',
          password: '',
          id: 0,
          joiningDate: new Date,
          mobile: ''
        })
        this.userService.isLogin = true
        this.route.navigate(['admin'])
      } else {
          let user: User = {} as User; 
          user = this.userService.getUsers().find((user) => user.email === email && user.password === pass )!
          if (_.isEmpty(user)){
            this.errorMessage = "User not Found!"
            
          }else {
            this.userService.setAdmin(user)
            setTimeout(() => {
              this.userService.isLogin = true;
              this.userService.setRole = user.role;
              switch (user.role){
                case 'CUSTOMER':{
                  this.route.navigate(['customer/detail']);
                    break;  
                }
                case 'MANAGER':{
                  this.route.navigate(['manager']);
                    break;  
                }
                case 'ENGINEER':{
                  this.route.navigate(['engineer']);
                    break;  
                }
              }                
            }, 1000);
          }
        }        
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub) => sub.unsubscribe())
  }
}
