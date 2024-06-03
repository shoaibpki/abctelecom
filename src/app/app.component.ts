import { initializeApp } from 'firebase/app';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ServicesService } from './service/services.service';
import { ComplaintService } from './service/complaint.service';
import { firebaseConfig } from 'src/FireBaseSetting';
import { fadeEffectState } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'abctelecom';
  role = '';

  constructor(private userService: UserService){
    initializeApp(firebaseConfig);
  }

  getRole(){
    if (this.userService.isLogin){
      this.role = this.userService.getRole;
      // console.log(this.role)
    }
    return this.role;
    
  }

}
