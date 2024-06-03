import { Component, HostBinding } from '@angular/core';
import { fadeEffectState } from 'src/app/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [
    fadeEffectState
  ]
})
export class CustomerComponent {

  @HostBinding('@fadeEffect') fadeEffect = true;

  showMsg: boolean = false;

  constructor(
    private router: Router
  ){}
  

  goHome() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
