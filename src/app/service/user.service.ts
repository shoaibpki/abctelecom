import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _rootUrl = 'http://localhost:8082/abctelecom/users'

  constructor(private http: HttpClient) { }

  login(email: string, pass: string) : Observable<User>{
    let params = new HttpParams()
      .set('email',email)
      .set('password', pass)
    return this.http.get<User>(`${this._rootUrl}`, { params })
  }
}
