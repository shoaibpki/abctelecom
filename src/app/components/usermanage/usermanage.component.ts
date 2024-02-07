import { User } from './../../interface/user';
import { UserService } from 'src/app/service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/app/interface/service';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() role: string = '';

  usersForm!: FormGroup;
  user!: User;
  _isedit: boolean = false;
  htmlServices: Service[] = [];
  _roles: {name: string}[] = [
    {
      name:"CUSTOMER"
    },
    {
      name: "MANAGER"
    },
    {
      name: "ENGINEER"
    }];

  constructor(
    private userService: UserService,
    private uServices: ServicesService, 
    private form: FormBuilder
  ){}

  ngOnInit(): void {
    this.createForm();
    this.htmlServices = this.uServices.getServices();
    this.addServiceInCheckBoxes();
    console.log(this.htmlServices)
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
        mobile: this.form.control(null),
        email: this.form.control(null, [Validators.required, Validators.email]),
        password: this.form.control(null, Validators.required),
        role: this.form.control(null),
        pinCode: this.form.control(null, Validators.required)  
      }),
      serviceArray: this.form.array([])
    });
  }

  createUser(){
    if (!this._isedit){
      this.user = this.usersForm.value['personalDetails'];
      console.log(this.usersForm.value['personalDetails'])
      // adding services of customer
      this.addServiceToCustomer()

      this.userService.createUser(this.user)
      .subscribe((data) => {
        // adding new user in user table
        this.users.push({...this.user , id: data})
      });  
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
    this.usersForm.reset();
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
        // console.log(err)
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
    }
  }
}