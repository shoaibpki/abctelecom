import { AfterContentInit, AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { fadeEffectState, showServiceState, slideRightDefault, slideTopDefault } from 'src/app/animations';
import { Service } from 'src/app/interface/service';
import { User } from 'src/app/interface/user';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';
import * as _ from 'underscore';

interface cRole {
  role: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ 
    slideRightDefault, 
    slideTopDefault,
    showServiceState,
    fadeEffectState
  ]
})

export class DashboardComponent {

  // @HostBinding('@fadeEffect') fadeEffect = false;
  totalServices: number = 0;
  totalRoles: cRole[] = [];
  role!:cRole;
  users: User[] = [];
  user!: User;
  services!: Service[];
  uAServices: Service[] = [];
  constructor(
    private userService: UserService,
    private uServices: ServicesService){}
  
  ngOnInit(): void {
    this.services = this.uServices.getServices();
    this.userService.getUsers().forEach((user) => this.users.push(user));
    let countRole = _.countBy(this.users, 'role') 
    let keys: string[] = Object.keys(countRole); // collect roles
    let values: number[] = Object.values(countRole); // total by roles
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      let val = values[index];
      this.role = {role: key, count: val}
      this.totalRoles.push(this.role);
    }
    this.userService.getUsers().forEach((user) => {
      if (user.role ==  'CUSTOMER'){
        user.services?.forEach((service) => this.uAServices.push(service))
      }
    })
  }

  getNewJoinDatebyRole(role: string){
    let filterUsers: User[] = _.filter(this.users, (user) => {return user.role === role});
    let u: any = _.reduce(filterUsers,(a, b) => { 
      return a.joiningDate > b.joiningDate ? a : b;
    })
    this.user = u;
    return this.user.joiningDate;
  }

  serviceTotal(id: number){
    let filterService = _.filter(this.uAServices, (service) => {return service.serviceId == id})
    return filterService.length
  }

}
