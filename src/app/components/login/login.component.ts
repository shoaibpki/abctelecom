import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';


  constructor(
    private userService: UserService, 
    private route: Router){}

  @ViewChild('loginForm') form!: NgForm;

  onSubmit(){
    let email = this.form.value['email'];
    let password = this.form.value['password'];
    this.userService.login(email, password)
    .subscribe({
      next: user => {
        if (user.role === 'ADMIN'){
          this.userService.setAdmin(user);
          this.route.navigate(['admin']);
        }
        this.userService.isLogin = true; 
        this.errorMessage = '';
      },
      error: err => { this.errorMessage = err['error'].message; }
    });
  }


}
