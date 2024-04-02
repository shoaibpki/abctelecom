import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/interface/complaint';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { UserService } from 'src/app/service/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})
export class EngineerComponent implements OnInit{

  engineer: User = this.userService.getAdmin();
  complaints: Complaint[] = [];
  complaintDetail!: Complaint;
  showDetails: boolean = false;
  status: string = '';
  allComplaints: Complaint[]=[];

  constructor(
    private userService: UserService,
    private complaintService: ComplaintService
    ){}
  
  ngOnInit(): void {
    // firebase database
    this.allComplaints =  this.complaintService.getFirebaseComplaints();
    
    // mysql database
    // this.complaintService.getAllComplaints().subscribe((comp) => {
    //   this.complaints = comp.filter((complaint) => complaint.engineerId === this.engineer.id && complaint.status === 'ON_GOING')
    //   console.log(comp)
    //   console.log(this.complaints)
    // });
  }

  fillComplaints(){
      this.complaints = this.allComplaints.filter((complaint) =>  complaint.status === 'ON_GOING' && complaint.engineerId === this.engineer.id);
  }

  showDtails(id: any){
    // mysql database
    // this.complaintDetail = this.complaints.find((complaint) => complaint.complaintId == id)!

    // firebase
    this.complaintDetail = this.complaints.find((complaint) => complaint.$key === id)!
    this.showDetails = true
    console.log(this.complaintDetail)
  }

  updateComplaint(key: string){
    let index = 0
    switch (this.status) {
      case 'ESCALATED':
        this.complaintService.jobNotDoneFirebase(key)
        index = this.complaints.findIndex((c) => c.$key == key);
        this.complaints[index].status = 'ESCALATED'
        this.showDetails = false

        // mysql database
        // this.complaintService.jobNotDone(this.complaintDetail.complaintId!).subscribe((complaint) => {
        //   let index = this.complaints.findIndex((c) => c.complaintId === complaint.complaintId);
        //   this.complaints.splice(index,1);
        //   this.showDetails = false
        // })
        break;
      case 'RESOLVED':
        this.complaintService.resolvedComplaintFirebase(key)
        index = this.complaints.findIndex((c) => c.$key === key);
        this.complaints[index].status = 'RESOLVED'
        this.showDetails = false

        // mysql database
        // this.complaintService.resolvedComplaint(this.complaintDetail.complaintId!).subscribe((complaint) => {
        //   let index = this.complaints.findIndex((c) => c.complaintId === complaint.complaintId);
        //   this.complaints.splice(index,1);
        //   this.showDetails = false
        // })
        break;
    }
    console.log(this.status);
  }

}

