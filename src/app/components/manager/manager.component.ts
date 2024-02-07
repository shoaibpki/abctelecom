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

  allComplaints: Complaint[] = [];
  raisedComplaint: Complaint[] = [];
  ongoingComplaint: Complaint[] = [];
  resolvedComplaint: Complaint[] = [];
  escalatedComplaint: Complaint[] = [];
  engineers!:User[];
  complaintId: number = 0;
  showEngineer: boolean = false

  constructor(
    private userService: UserService,
    private complaintsService: ComplaintService
    ){}

  ngOnInit(){
    this.complaintsService.getAllComplaints()
      .subscribe((complnts) =>{
        this.allComplaints = complnts;
        this.raisedComplaint = this.allComplaints.filter((value) => value.status == 'RAISED')
        this.ongoingComplaint = this.allComplaints.filter((value) => value.status == 'ON_GOING')
        this.resolvedComplaint = this.allComplaints.filter((value) => value.status == 'RESOLVED')
        this.escalatedComplaint = this.allComplaints.filter((value) => value.status == 'ESCALATED')
        });

  }

  selectEngineer(complaint: Complaint){
    let pincode: string = complaint.customer?.pinCode!;
    this.complaintId = complaint.complaintId!;
    this.engineers = this.userService.getUsers().filter((user) => user.pinCode == pincode && user.role == 'ENGINEER');
    this.showEngineer = true;
  }

  assignJob(eid: number){
    this.complaintsService.assignEngineerToComplaint(this.complaintId,eid).subscribe((comp) => {
      let i = this.raisedComplaint.findIndex((value) => value.complaintId == this.complaintId);
      this.raisedComplaint.splice(i,1);
      this.ongoingComplaint.push(comp)
      this.showEngineer = false;
    });
  }
}
