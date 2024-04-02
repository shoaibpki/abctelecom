import { User } from './../../interface/user';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';
import * as _ from "underscore";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  admin!: User;
  role: string = '';
  filterUsers!: User[];
  showMenu: boolean = true;
  changeRole:boolean = true;
  
  constructor(
    private route: Router,
    private userService: UserService,
    private services: ServicesService){}

  ngOnInit(): void {
    this.admin = this.userService.getAdmin();
  }
  setRoleCustomer(){
    this.userService.setRole = 'CUSTOMER';
  }
  setRoleManager(){
    this.userService.setRole = 'MANAGER';
  }
  setRoleEngineer(){
    this.userService.setRole = 'ENGINEER';
  }
  toggleMenu(){
    this.showMenu = !this.showMenu;        
  }
}
