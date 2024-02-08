import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ServicesService } from './service/services.service';
import { ComplaintService } from './service/complaint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'abctelecom';
  constructor(
    private userService: UserService, 
    private services: ServicesService,
    private complaint:  ComplaintService){}

  
  ngOnInit(): void {
  }

  isLogin(){
    return this.userService.isLogin
  }

  logout(){
    this.userService.getUsers().splice(0, this.userService.getUsers().length)
    this.services.getServices().splice(0, this.services.getServices().length)
    this.userService.isLogin = false
  }
}
