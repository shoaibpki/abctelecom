import { User } from './../../interface/user';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin!: User;
  role: string = '';
  filterUsers!: User[];
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
    console.log(this.userService.isLogin);
    this.admin = this.userService.getAdmin();
    this.userService.getHttpUsers()
    .subscribe((users) => {
      users.forEach((user) => this.userService.setUsers(user));
    });
  }
  setRoleCustomer(){
    this.role = 'CUSTOMER';
    this.filterUsers = this.userService.getUsers().filter((user) => user.role == this.role)
  }
  setRoleManager(){
    this.role = 'MANAGER';
    this.filterUsers = this.userService.getUsers().filter((user) => user.role == this.role)
  }
  setRoleEngineer(){
    this.role = 'ENGINEER';
    this.filterUsers = this.userService.getUsers().filter((user) => user.role == this.role)
  }
}
