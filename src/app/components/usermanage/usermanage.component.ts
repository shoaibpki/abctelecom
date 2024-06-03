import { User } from './../../interface/user';
import { UserService } from 'src/app/service/user.service';
import { Component, HostBinding, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/app/interface/service';
import * as _ from "underscore";
import { Observable, Subscription, of, map } from 'rxjs';
import { deleteSlideRightState, fadeEffectState, selectRecordState } from 'src/app/animations';
import { getDatabase, onValue, ref } from 'firebase/database';
@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css'],
  animations: [
    fadeEffectState,
    deleteSlideRightState,
    selectRecordState
  ]
})
export class UsermanageComponent implements OnInit {
  @HostBinding('@fadeEffect') routeAnimation = true;
  users: User[] = [];
  selectedId: number = 0;
  currentId: number = 0;

  _sortArrow: boolean = true;
  _sortByName: boolean = true;
  _sortBypincode: boolean = false;
  showMessage: boolean = false;
  showSpinner: boolean = false;
  _isedit: boolean = false;
  currentDate: Date = new Date();

  usersForm!: FormGroup;
  user: User = {} as User;
  htmlServices: Service[] = [];
  uService: Service[] = [];
  msg: string = "Successfully Save ";

  constructor(
    private userService: UserService,
    private uServices: ServicesService, 
    private form: FormBuilder
  ){}
  ngOnInit(): void {
    this.createForm();
    this.htmlServices = this.uServices.getServices();
    this.addServiceInCheckBoxes();
    this.users = this.userService.getUsers();

    // adding customer services.....
    this.services.valueChanges.subscribe((val: any[]) => {
      this.uService.splice(0,this.uService.length);

      for (let index = 0; index < val.length; index++) {
        if (val[index] === true){
          this.uService.push(this.htmlServices[index]);
        }
      }
    })
  }
  
  getRole(){
    return this.userService.getRole
  }  
  public get services() : FormArray {
    return this.usersForm.controls['personalDetails'].get('serviceArray') as FormArray
  }
  
  private addServiceInCheckBoxes(){
      this.htmlServices.forEach((service) => {
        this.services.push(this.form.control(false))
      })
  }
  private updateServiceInCheckBoxes(s: Service){
    let index : Number = this.htmlServices.findIndex((cs) => cs.serviceId == s.serviceId)
    this.services.controls.map((control, i) => {
      if (i == index){  
        control.patchValue(true)
      }
    })
  }

  private createForm(){
    this.usersForm =  this.form.group({
      personalDetails: this.form.group({
        userName: [null, Validators.required],
        mobile: this.form.control(null, Validators.maxLength(12)),
        email: this.form.control(null, [Validators.required, Validators.email]),
        password: this.form.control(null, Validators.required),
        joiningDate: this.form.control(this.currentDate, Validators.required),
        role: this.form.control({value: this.getRole(), disabled: true},{nonNullable: true}),
        pinCode: this.form.control(null, Validators.required),
        serviceArray: this.form.array([])
      }),
    });
  }

  createUser(){
    if (!this._isedit){
      // this.user = this.usersForm.value['personalDetails'];
      this.user.role = this.getRole();
      this.user.userName = this.usersForm.value.personalDetails.userName;
      this.user.email = this.usersForm.value.personalDetails.email
      this.user.mobile = this.usersForm.value.personalDetails.mobile
      this.user.password = this.usersForm.value.personalDetails.password
      this.user.joiningDate = this.usersForm.value.personalDetails.joiningDate
      this.user.pinCode = this.usersForm.value.personalDetails.pinCode
      
      // adding services of customer
      this.addServiceToCustomer();

      if ( this.user.services?.length == 0 && this.user.role === 'CUSTOMER'){
        this.showMessage = true;
        this.msg = "atleast one service select for a ";
      } else {
        this.showSpinner = true;
        this.showMessage = false;
        setTimeout(() => {
          this.showSpinner = false;
          this.msg = "Successfully add a ";
          this.showMessage = true;

          // for firebase database
          this.userService.addFirebaseUser(this.user)
          this.users.push(this.user)

          // for mysql database
          // this.userService.createUser(this.user)
          // .subscribe({ 
          //   next: (data) => {
          //   // adding new user in user table
          //   this.users.push({...this.user , id: data})
          //   },
          //   error: (err) => {
          //     this.msg = err;
          //   }
          // });  
        }, 5000);  
      }
    } else {
      let id = this.user.id;
      this.user = this.usersForm.value['personalDetails'];
      this.user.id = id;      
      this.user.role = this.getRole();

      // adding services of customer
      this.addServiceToCustomer()
      if (this.user.services?.length == 0 && this.getRole() === 'CUSTOMER'){
        this.showMessage = true;
        this.msg = "atleast one service select for a "
      }else {
        this.showSpinner = true;
        this.showMessage = false
        setTimeout(() => {
          this.showSpinner = false
          this.msg = "Successfully Save ";
          this.showMessage = true;

          // updated firebase databse


          // updated mysql database
          // this.userService.updateUser(id, this.user)
          // .subscribe((user) => {
          //   let index = this.users.findIndex( u => u.id == user.id);
          //   //update value in user table
          //   this.users[index] = user;
          // })
        }, 5000);
        }
    }
  }
  
  userEdit(id: number){
    this.currentId = id;
    console.log(this.currentId, this.selectedId);
    // all service checked boxes un checked
    this.services.controls.map((control, i) => {
        control.patchValue(false)
    })
    this.user = this.userService.getUsers().find((user) => user.id == id)!

    // set values in html form field
    this.usersForm.controls['personalDetails'].patchValue(
     {
      userName: this.user.userName,
      mobile: this.user.mobile,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      pinCode: this.user.pinCode,
      joiningDate: this.user.joiningDate
    })
    this._isedit = true;
  
    // if customer already avail services
    if (this.user.services?.length! > 0){
      this.user.services?.forEach((service) => {
        let selectService = 
          this.htmlServices.find(uservice => uservice.serviceId == service.serviceId)
          // add current service of customer
        if (selectService != null){
          this.updateServiceInCheckBoxes(selectService)
        }
      })
    }
  }

  deleteUser(id: number){
    let index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
    // this.userService.deleteUser(id)
    // .subscribe(({
    //   next: msg => {
    //     let index = this.users.findIndex(user => user.id === id);
    //     this.users.splice(index, 1);
    //   },
    //   error: err => {
    //     console.log(err)
    //   }
    // }));
  }

  private addServiceToCustomer(){
    if (this.getRole() == 'CUSTOMER'){
      this.user.services = [];
      this.uService.forEach((service) => this.user.services?.push(service))
    }
  }

  reset(){
    this.showMessage = false;
    this.showSpinner = false;
    this.usersForm.reset();
    this._isedit = false
  }

  getHtmlUsers(): User[] {
    let u =  this.users.filter((user) => user.role === this.getRole());
    if (this._sortArrow){
      u = u.sort(
        (a,b) => a.userName.toLowerCase().localeCompare(
          b.userName.toLowerCase()
        ));
    } 
    else {
      u = u.sort(
        (a,b) => a.userName.toLowerCase().localeCompare(
          b.userName.toLowerCase()
        )).reverse();     
    }
    return u;
  }
}