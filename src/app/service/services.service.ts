import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../interface/service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/service';
  _service: Service[] = [];

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

