import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { inputFocusState } from 'src/app/animations';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    inputFocusState
  ]
})
export class SignupComponent {

  @ViewChild('signupForm') signupForm!: NgForm;

  constructor(
    private userService: UserService,
    private route: Router){}

  getFormValue( ){
    this.userService.addFirebaseUser({
      userName: 'admin',
      role: 'ADMIN',
      joiningDate: new Date(),
      email: 'admin@abc.com',
      mobile: '',
      password: '123',
      id: 0
    })
    // this.userService.registerFireBaseUser(
    //   this.signupForm.value.email, 
    //   this.signupForm.value.password);
    
    this.route.navigate(['login'])
  }
}
