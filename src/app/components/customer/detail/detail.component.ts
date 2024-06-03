import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/interface/complaint';
import { Service } from 'src/app/interface/service';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  constructor(
    private userService: UserService, 
    private services: ServicesService,
    private form: FormBuilder
  ){}

  userForm!: FormGroup;
  user!: User;
  cService!: Service;
  showMsg: boolean = false;
  complaints: Complaint[] = [];
  field: string = '';

  ngOnInit(): void {
    this.user = this.userService.getAdmin();
    this.creatForm();
  }

  creatForm(){
    this.userForm =  this.form.group({
        username: this.form.control({ 
          value: this.user.userName, 
          disabled: true 
        }, Validators.required),
        mobile: this.form.control({
          value: this.user.mobile,
          disabled: true
        }, Validators.maxLength(12)),
        email: this.form.control({
          value: this.user.email,
          disabled: true
        }, [Validators.required, Validators.email]),
        password: this.form.control({
          value: this.user.password,
          disabled: true
        }, Validators.required),
        pincode: this.form.control({
          value: this.user.pinCode,
          disabled: true
        }, Validators.required),
    });
  }

  onSaveUser(){
    this.user.userName = this.userForm.controls['username'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.mobile = this.userForm.controls['mobile'].value;
    this.user.pinCode = this.userForm.controls['pincode'].value;
    // this.userService.updateFirebaseUser(this.user);
    this.userForm.controls[this.field].disable();
    console.log(this.user)
  }

  editField(value: string){
    this.field = value;
    this.userForm.controls[this.field].enable()
  }
}
