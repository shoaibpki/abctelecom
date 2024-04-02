import  * as _  from 'underscore';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, observable } from 'rxjs';
import { User } from '../interface/user';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, getDatabase, increment, onChildAdded, onValue, push,  query,  ref, set } from 'firebase/database'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogin: boolean = false;
  private users: User[] = []; 
  private _admin: User = {
    role: '',
    userName: '',
    email: '',
    password: '',
    id: 0,
    joiningDate: new Date,
    mobile: ''
  }; 
  private _rootUrl = 'http://localhost:8082/abctelecom/users'
  private _role: string = '';
  // private userList: AngularFireList<User>;

  constructor(private http: HttpClient ) {}

  
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

 // updateFirebaseUser(user: User){
  //   let key = user.$key!;
  //   this.userList.update(key, user);
  // }
  // deleteFirebaseUser(key: string){
  //   this.userList.remove(key);
  // }
  
}

