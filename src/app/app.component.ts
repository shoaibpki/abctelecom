import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './interface/user';
import { ServicesService } from './service/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'abctelecom';
  constructor(private userService: UserService, private services: ServicesService){}
  
  ngOnInit(): void {
   
  }
}
