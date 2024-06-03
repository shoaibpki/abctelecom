import { Component } from '@angular/core';
import { serviceDetailState } from 'src/app/animations';
import { Service } from 'src/app/interface/service';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.css'],
  animations: [
    serviceDetailState
  ]
})
export class ShowServicesComponent {

  services: Service[] = [];

  constructor(private uService: ServicesService){}

  ngOnInit(){
    this.services = this.uService.getServices();
  }

}
