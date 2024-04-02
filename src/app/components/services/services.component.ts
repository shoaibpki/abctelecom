import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeEffectState } from 'src/app/animations';
import { Service } from 'src/app/interface/service';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [fadeEffectState]
})
export class ServicesComponent implements OnInit {
  @HostBinding('@fadeEffect') routeAnimation = true;
  htmlServices!: Service[];
  constructor(private services: ServicesService){}

  ngOnInit(): void {
    this.htmlServices = this.services.getServices();
  }

}
