import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeEffectState } from 'src/app/animations';
import { Service } from 'src/app/interface/service';
import { ComplaintService } from 'src/app/service/complaint.service';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    fadeEffectState
  ]
})
export class HeaderComponent {

  role: string = '';
  username: string = '';
  services: Service[] = [];

  constructor(
    private userService: UserService,
    private uService: ServicesService, 
    private complaint:  ComplaintService,
    private router: Router){}
  
  ngOnInit(){
    this.userService.getFireBaseUsers();
    this.services = this.uService.getServices()
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

  mypage(){
    setTimeout(() => {
      switch (this.role) {
        case 'CUSTOMER':
          this.router.navigate(['customer/detail']);          
          break;
        case 'MANAGER':
          this.router.navigate(['manager']);          
          break;
        case 'ENGINEER':
          this.router.navigate(['engineer']);          
          break;
        case 'ADMIN':
          this.router.navigate(['admin'])
      }
    }, 1000);
  }

}
