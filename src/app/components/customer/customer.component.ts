import { ServicesService } from './../../service/services.service';
import { User } from './../../interface/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Complaint } from 'src/app/interface/complaint';
import { Service } from 'src/app/interface/service';
import { UserService } from 'src/app/service/user.service';
import { ComplaintService } from 'src/app/service/complaint.service';
import { random } from 'underscore';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('complaintForm') form!: NgForm;
  user!: User;
  cService!: Service;
  showSpinner: boolean = false;
  getFeedback: string = '';
  complaint!: Complaint;
  showMsg: boolean = false;
  complaints: Complaint[] = [];

  constructor(
    private userService: UserService, 
    private services: ServicesService,
    private complaintService: ComplaintService
  ){}
  
  ngOnInit(): void {
    this.user = this.userService.getAdmin()
    this.complaints = this.complaintService.getFirebaseUserComplaint(this.user.id);
  }

  onSubmit(fields: any){
    // save on firebase
    let id: number = fields['serviceId']
    let date = new Date();
    let refNo: string = random(9999).toString();
    let dayref: string = date.getDate().toString();
    let monthref: string = (date.getMonth() + 1).toString();
    if (dayref.length === 1){
      dayref = '0' + dayref;
    }
    if (monthref.length === 1){
      monthref = '0' + monthref
    }
    this.cService = this.services.getServices().find((service) => service.serviceId == id)!
    let complaint: Complaint = {
      complaint: fields['complaint'],
      status: 'RAISED',
      service: this.cService,
      cdate: formatDate(date, 'YYYY-MM-dd','en-US'),
      referenceNo: 'CMP'+ '-' + refNo + '-' + dayref + '-' + monthref,
      customer: this.user
    };
    this.complaintService.addFirebaseComplaint(this.user.id, complaint);
    this.complaints.push(complaint);
    this.form.reset();

    // save mysql database
    // this.complaintService.saveComplaint(this.user.id, complaint)
    //   .subscribe((comp) => {
    //     this.user.complaints?.push(comp);
    //   });    
  }

  feedback(){
    this.showSpinner = true
    this.complaint.feedback = this.getFeedback;
    setTimeout(() => {
      this.complaintService.saveFeedback(this.complaint).subscribe((comp) => {
        this.complaint = comp
        this.showSpinner = false;
        this.showMsg = true;
        console.log(this.complaint);
      })
    }, 3000);
  }

  setComplaint(comp: Complaint){
    this.showMsg = false;
    this.complaint = comp;
    this.getFeedback = comp.feedback!
  }


}
