import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../interface/service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/service';
  private _service: Service[] = [];

  
  addService(v : Service) {
    this._service.push(v);
  }

  getService(){
    return this._service;
  } 
  

  constructor(private http: HttpClient) { }
  
  getCustomServices(): Observable<Service[]>{
    return this.http.get<Service[]>(this._rootUrl)
      .pipe(map((data) => {
        let services: Service[] = [];
        data.map((service) => {
          services.push(
            {
              serviceId: service.serviceId, 
              name: service.name
            })
        })
        return services;
      }));
  }
}

