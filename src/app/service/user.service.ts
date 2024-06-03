import  * as _  from 'underscore';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, getDatabase, increment, onChildAdded, onValue, push,  query,  ref, set } from 'firebase/database'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogin: boolean = false;
  private users: User[] = []; 
  private _admin: User = {} as User;
  private _rootUrl = 'http://localhost:8082/abctelecom'
  private _role: string = '';
  private _password = '';

  constructor(private http: HttpClient ) {}

  public set isLogin(v : boolean) {
    this._isLogin = v;
  }

  public get isLogin() : boolean {
    return this._isLogin;
  }
  
  public set password(pass: string){
    this._password = pass;
  }
  
  public setAdmin(v : User) {
    this._admin = v;
  }

  
  public getAdmin() : User {
    return this._admin;
  }

  
  public set setRole(v : string) {
    this._role = v;
  }

  
  public get getRole() : string {
    return this._role
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

  login(email: string) : Observable<User>{   
    let params = new HttpParams()
      .set('email',email)
      .set('password', this._password)
    return this.http.get<User>(`${this._rootUrl}/login`, { params })
  }

  getHttpUsers(email: string) : Observable<User[]> {
    let headers = new HttpHeaders({ 
      authorization: 'Basic ' +btoa(email + ':' + this._password)

     });
    return this.http.get<User[]>(
      `${this._rootUrl}/users`,
      { headers: headers}
    );
  }
  
  updateUser(id: number, user: User) : Observable<User> {
    let headers = new HttpHeaders({ 
      authorization: 'Basic ' +btoa(this._admin.email + ':' + this._password)

     });
    return this.http.put<User>(`${this._rootUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<string>{
    let headers = new HttpHeaders({ 
      authorization: 'Basic ' +btoa(this._admin.email + ':' + this._password)

     });
    return this.http.delete<string>(`${this._rootUrl}/${id}`,{headers: headers})

  }

  registerFireBaseUser(email: string, password: string){
    let auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log({user});
      })
      .catch((error) => {
        console.log(error);
      }) 
  }

  loginFireBaseUser(email: string, password: string){
    let auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  logoutFireBaseUser(){
    let auth = getAuth();
    signOut(auth).then(() => console.log('Logout successfully!'));
  }

  getFireBaseUsers() {
    this.users = [];
    let db = getDatabase();
    let uRef = ref(db, 'users');
    onValue(uRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.setUsers(childSnapshot.val());
      });
    }, { onlyOnce: true });
  }
  addFirebaseUser(user: User){
    let u: any = _.max(this.getUsers(), 'id' )
    let mxId = 0;
    if (!_.isEmpty(u)){
      mxId= u.id;
      user.id = mxId + 1;
    }else {
      user.id = 1;
    }
    let db = getDatabase();
    set(ref(db,`users/${user.id}`), user);
    // let serviceRef = ref(db,`users-services/${user.id}`);
  }

  updateFirebaseUser(user: User){
    let db = getDatabase();
    let uRef = ref(db, `users/${user.id}`)
    set(uRef, user);
  }

  
}

