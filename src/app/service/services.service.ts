import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../interface/service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/service';
  private _service: Service[] = [
      {
        serviceId : 1,
        Description : "Mobile desc",
        name : "Mobile Service"
      },
      {
        serviceId : 2,
        Description : "Internet desc",
        name : "Internet Service"
      },
      {
        serviceId : 3,
        Description : "TV desc",
        name : "TV Service"
      }
  ];

  
  public setService(v : Service) {
    this._service.push(v);
  }

  
  public getServices() : Service[] {
    return this._service
  }
  
  
  constructor(private http: HttpClient) { }
  
  // setCustomServices(){
  //   this.http.get<Service[]>(this._rootUrl)
  //     .pipe(map((data) => {
  //       let services: Service[] = [];
  //       data.map((service) => {
  //         services.push(
  //           {
  //             serviceId: service.serviceId, 
  //             name: service.name
  //           })
  //       })
  //       return services;
  //     })).subscribe((services) => this._service = services);
  // }
  getFullServices(): Observable<Service[]>{
    // this.http.get<Service[]>(this._rootUrl).subscribe((data) => this._service = data)
    return this.http.get<Service[]>(this._rootUrl)
  }
}

