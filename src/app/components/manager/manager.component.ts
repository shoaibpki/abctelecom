import { Complaint } from './../../interface/complaint';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
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
  complaintDetail!: Complaint;
  complaintId: number = 0;
  spinId: number = 0;
  customer: User = {userName: '', email: '', mobile: '', id: 0, password: '', role: ''};
  showMsg: boolean = false;

  constructor(
    private userService: UserService,
    private complaintsService: ComplaintService
    ){}

  ngOnInit(){
    this.complaintsService.getAllComplaints()
    .subscribe((complnts) =>{
        this.allComplaints = complnts;
    });    
  }

  assignJob(e: any, eid: number ){
    this.complaintsService.assignEngineerToComplaint(this.complaintId,eid).subscribe((comp) => {
      let i = this.allComplaints.findIndex((value) => value.complaintId == comp.complaintId);
      this.spinId = eid;
      this.showSpiner = true;
      setTimeout(() => {
        this.showMsg = true;
        this.showSpiner = false;
      }, 3000);  
      this.allComplaints[i].status = comp.status;
    });
  }

  selectStatus(value: string){
      if (value == 'ALL'){
        this.filterComplaints = this.allComplaints;
      }else {
        this.filterComplaints = this.allComplaints.filter((c) => c.status == value);
      }
  }

  showEngineer(complaint: Complaint){
    let pincode: string = complaint.customer?.pinCode!;
    this.complaintId = complaint.complaintId!;
    this.engineers = this.userService.getUsers().filter((user) => user.pinCode == pincode && user.role == 'ENGINEER');
  }

  showCustomer(cust: User){
    this.customer = cust;
  }
  showHtmlComplaint(complaint: Complaint){
    this.complaintDetail = complaint;
  }

  closeSpinner(){
    this.showSpiner = false;
    this.showMsg = false
  }

}
