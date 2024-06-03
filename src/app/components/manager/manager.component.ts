import { Complaint } from './../../interface/complaint';
import { Component, HostBinding, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { UserService } from 'src/app/service/user.service';
import { fadeEffectState, modalEffectState, selectRecordState } from 'src/app/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  animations:[
    fadeEffectState,
    modalEffectState,
    selectRecordState
  ]
})
export class ManagerComponent implements OnInit {
  complaintStatus: any[] = [
    {'status': 'ALL'},
    {'status': 'RAISED'},
    {'status': 'ON_GOING'},
    {'status': 'ESCALATED'},
    {'status': 'RESOLVED'}
  ];

  filterComplaints: Complaint[] = [];
  allComplaints: Complaint[] = [];
  engineers!:User[];
  showSpiner:boolean = false;
  complaintDetail: Complaint = {complaint: '', status: '', service: {name: '',serviceId: 0}, cdate: new Date(), jdate: new Date()};
  complaintId: number = 0;
  spinId: number = 0;
  customer: User = {} as User;
  showMsg: boolean = false;
  $key: string = '';
  showModal: boolean = false; 

  constructor(
    private userService: UserService,
    private complaintsService: ComplaintService,
    private router: Router
    ){}

  ngOnInit(){

    // get complaints from firebase database
    this.allComplaints =  this.complaintsService.getFirebaseComplaints();
    this.selectStatus('ALL');

    // get complaints from mysql database
    // this.complaintsService.getAllComplaints()
    // .subscribe((complnts) =>{
    //     this.allComplaints = complnts;
    // });    
  }

  assignJob(eid: number ){

    // firebase database updates
    this.complaintsService.assignJobToEngineerFirebase(this.$key, eid);
    let i = this.allComplaints.findIndex((value) => value.$key == this.$key);
    this.spinId = eid;
    this.showSpiner = true;
    setTimeout(() => {
      this.showMsg = true;
      this.showSpiner = false;
    }, 3000);  
    this.allComplaints[i].status = 'ON_GOING';

// mysql database upadates
    // this.complaintsService.assignEngineerToComplaint(this.complaintId,eid).subscribe((comp) => {
    //   let i = this.allComplaints.findIndex((value) => value.complaintId == comp.complaintId);
    //   this.spinId = eid;
    //   this.showSpiner = true;
    //   setTimeout(() => {
    //     this.showMsg = true;
    //     this.showSpiner = false;
    //   }, 3000);  
    //   this.allComplaints[i].status = comp.status;
    // });
  }

  selectStatus(value: string){

    if (value == 'ALL'){
      this.filterComplaints = this.allComplaints;
    }else {
      this.filterComplaints = this.allComplaints.filter((c) => c.status === value);
    }
  }

  showEngineer(complaint: Complaint){
    this.showModal = true
    this.$key = complaint.$key!;
    let pincode: string = complaint.customer?.pinCode!;
    this.complaintId = complaint.complaintId!;
    this.engineers = this.userService.getUsers().filter((user) => user.pinCode == pincode && user.role == 'ENGINEER');
  }

  showCustomer(cust: User){
    this.customer = cust;
    this.showModal = true
  }
  showHtmlComplaint(complaint: Complaint){
    this.showModal = true
    this.complaintDetail = complaint;
  }

  modelFalse(){
    this.showModal = false;
  }

  closeSpinner(){
    this.showModal = false;
    this.showSpiner = false;
    this.showMsg = false;
  }

  goHome(){
    setTimeout(() => {
      this.router.navigate([''])      
    }, 1000);
  }

}
