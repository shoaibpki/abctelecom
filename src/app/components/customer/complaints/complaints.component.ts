import { formatDate } from '@angular/common';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { fadeEffectState } from 'src/app/animations';
import { Complaint } from 'src/app/interface/complaint';
import { Service } from 'src/app/interface/service';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';
import { random } from 'underscore';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  animations: [
    fadeEffectState
  ]
})
export class ComplaintsComponent {

  @HostBinding('@fadeEffect') fadeEffect = true;

  @ViewChild('complaintForm') cform!: NgForm;
  user!: User;
  cService!: Service;
  showSpinner: boolean = false;
  getFeedback: string = '';
  complaint!: Complaint;
  showMsg: boolean = false;
  complaints: Complaint[] = [];
  field: string = '';

  constructor(
    private userService: UserService, 
    private services: ServicesService,
    private complaintService: ComplaintService,
    private form: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.user = this.userService.getAdmin();
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
    // this.cform.reset();

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
