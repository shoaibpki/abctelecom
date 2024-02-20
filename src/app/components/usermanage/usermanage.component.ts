import { User } from './../../interface/user';
import { UserService } from 'src/app/service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/app/interface/service';
import * as _ from "underscore";
@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() role: string = '';

  _sortArrow: boolean = false;
  _sortByName: boolean = true;
  _sortBypincode: boolean = false;
  showMessage: boolean = false;
  showSpinner: boolean = false;
  _isedit: boolean = false;

  usersForm!: FormGroup;
  user!: User;
  htmlServices: Service[] = [];
  msg: string = "Successfully Save "
    
  constructor(
    private userService: UserService,
    private uServices: ServicesService, 
    private form: FormBuilder
  ){}

  ngOnInit(): void {
    this.createForm();
    this.htmlServices = this.uServices.getServices();
    this.addServiceInCheckBoxes();
  }
  
  public get services() : FormArray {
    return this.usersForm.controls['serviceArray'] as FormArray
  }
  
  private addServiceInCheckBoxes(){
    this.htmlServices.forEach((service) => {
      if (service.serviceId === 0){
        this.services.push(this.form.control(true,Validators.required))
      } else {
        this.services.push(this.form.control(false))
      }
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
        userName: this.form.control(null, Validators.required),
        mobile: this.form.control(null, Validators.minLength(12)),
        email: this.form.control(null, [Validators.required, Validators.email]),
        password: this.form.control(null, Validators.required),
        role: this.form.control({value: this.role, disabled: true}),
        pinCode: this.form.control(null, Validators.required)  
      }),
      serviceArray: this.form.array([])
    });
  }

  createUser(){
    if (!this._isedit){
      this.user = this.usersForm.value['personalDetails'];
      this.user.role = this.role;
      
      // adding services of customer
      this.addServiceToCustomer()
      
      if ( this.user.services?.length == 0){
        this.showMessage = true;
        this.msg = "atleast one service select for a "
      } else {
        this.showSpinner = true;
        this.showMessage = false;
        setTimeout(() => {
          this.showSpinner = false;
          this.msg = "Successfully Save ";
          this.showMessage = true;
          this.userService.createUser(this.user)
          .subscribe((data) => {

            // adding new user in user table
            this.users.push({...this.user , id: data})
          });  
          this.usersForm.reset();
        }, 5000);  
      }
    } else {
      let id = this.user.id;
      this.user = this.usersForm.value['personalDetails'];
      this.user.id = id;
      
      // adding services of customer
      this.addServiceToCustomer()
      this.userService.updateUser(id, this.user)
        .subscribe((user) => {
          let index = this.users.findIndex( u => u.id == user.id);
          //update value in user table
          this.users[index] = user;
        })
      this._isedit = false;
    }
  }
  
  userEdit(id: number){
    this.services.controls.map((control, i) => {
        control.patchValue(false)
    })
    this.user = this.users.find((user) => user.id == id)!

    // set values in html form field
    this.usersForm.controls['personalDetails'].setValue(
     {
      userName: this.user.userName,
      mobile: this.user.mobile,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      pinCode: this.user.pinCode
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
    this.userService.deleteUser(id)
    .subscribe(({
      next: msg => {
        let index = this.users.findIndex(user => user.id === id);
        this.users.splice(index, 1);
      },
      error: err => {
        let index = this.users.findIndex(user => user.id === id);
        this.users.splice(index, 1);  
      }
    }));
  }

  private addServiceToCustomer(){
    if (this.role == 'CUSTOMER'){
      this.user.services = [];
      this.services.controls.forEach((control,i) => {
        if (control.value){
          this.user.services?.push(this.htmlServices[i])
        }          
      })
      console.log(this.user.services);
    }
  }

  reset(){
    this.showMessage = false;
    this.showSpinner = false;
    this.usersForm.reset();
  }

  sortField(sortField: string){
    if(!this._sortArrow){
      this.users = _.sortBy<User[]>(this.users, sortField);
      this._sortArrow = true;
    }else{
      this.users = _.sortBy<User[]>(this.users, sortField).reverse();
      this._sortArrow = false;
    }
  }

  onSortName(){
    this._sortByName = true;
    this._sortBypincode = false;
  }
  onSortPincode(){
    this._sortByName = false;
    this._sortBypincode = true;
  }

}