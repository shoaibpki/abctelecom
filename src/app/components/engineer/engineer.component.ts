import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/interface/complaint';
import { User } from 'src/app/interface/user';
import { ComplaintService } from 'src/app/service/complaint.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})
export class EngineerComponent implements OnInit {

  engineer: User = this.userService.getAdmin();
  complaints: Complaint[] = [];
  complaintDetail!: Complaint;
  showDetails: boolean = false;
  status: string = '';

  constructor(
    private userService: UserService,
    private complaintService: ComplaintService
    ){}

  ngOnInit(): void {
    this.complaintService.getAllComplaints().subscribe((comp) => {
      this.complaints = comp.filter((complaint) => complaint.engineerId === this.engineer.id && complaint.status === 'ON_GOING')
      console.log(comp)
      console.log(this.complaints)
    });
  }

  showDtails(id: any){
    this.complaintDetail = this.complaints.find((complaint) => complaint.complaintId == id)!
    this.showDetails = true
    console.log(this.complaintDetail)
  }

  updateComplaint(){
    switch (this.status) {
      case 'ESCALATED':
        this.complaintService.jobNotDone(this.complaintDetail.complaintId!).subscribe((complaint) => {
          let index = this.complaints.findIndex((c) => c.complaintId === complaint.complaintId);
          this.complaints.splice(index,1);
          this.showDetails = false
        })
        break;
      case 'RESOLVED':
        this.complaintService.resolvedComplaint(this.complaintDetail.complaintId!).subscribe((complaint) => {
          let index = this.complaints.findIndex((c) => c.complaintId === complaint.complaintId);
          this.complaints.splice(index,1);
          this.showDetails = false
        })
        break;
    }
    console.log(this.status);
  }

}
