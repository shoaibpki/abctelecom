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
        Description : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        name : "Cystal Clear Voice",
        image: "phone.jpg"
      },
      {
        serviceId : 2,
        Description : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        name : "Ultra-Fast Internet",
        image: "internet.jpg"
      },
      {
        serviceId : 3,
        Description : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        name : "HD TV",
        image: "hdtv.jpg"
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

