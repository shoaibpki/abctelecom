import { initializeApp } from 'firebase/app';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ServicesService } from './service/services.service';
import { ComplaintService } from './service/complaint.service';
import { firebaseConfig } from 'src/FireBaseSetting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'abctelecom';
  role: string = '';
  username: string = '';

  constructor(
    private userService: UserService, 
    private services: ServicesService,
    private complaint:  ComplaintService){
      initializeApp(firebaseConfig);
    }
  
  ngOnInit(){
    this.userService.getFireBaseUsers();
  }

  isLogin(){
    if (this.userService.isLogin){
      this.role = this.userService.getAdmin().role;
      this.username = this.userService.getAdmin().userName;
    }
    return this.userService.isLogin
  }

  logout(){
    // this.userService.getUsers().splice(0, this.userService.getUsers().length)
    // this.services.getServices().splice(0, this.services.getServices().length)
    this.userService.isLogin = false
  }
}
