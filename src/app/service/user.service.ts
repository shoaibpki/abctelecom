import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogin: boolean = false;
  private users: User[] = []; 
  private _admin!: User; 
  private _rootUrl = 'http://localhost:8082/abctelecom/users'

  constructor(private http: HttpClient) { }

  
  public set isLogin(v : boolean) {
    this._isLogin = v;
  }

  
  public get isLogin() : boolean {
    return this._isLogin;
  }
  
  
  public setAdmin(v : User) {
    this._admin = v;
  }

  
  public getAdmin() : User {
    return this._admin;
  }
  
  createUser(user: User) : Observable<any>{
    return this.http.post(`${this._rootUrl}`, user)
  }

  setUsers(user: User){
    this.users.push(user);
  }
  getUsers(): User[]{
    return this.users;
  }

  login(email: string, pass: string) : Observable<User>{   
    let params = new HttpParams()
      .set('email',email)
      .set('password', pass)
    return this.http.get<User>(`${this._rootUrl}/login`, { params })
  }

  getHttpUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this._rootUrl}`);
  }
  
  updateUser(id: number, user: User) : Observable<User> {
    return this.http.put<User>(`${this._rootUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<string>{
    let header = new HttpHeaders({
      'Content-Type' : 'application/text'
    });
    return this.http.delete<string>(`${this._rootUrl}/${id}`,{headers: header})

  }

}
