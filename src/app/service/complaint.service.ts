import { Complaint } from './../interface/complaint';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, child, equalTo, get, getDatabase, onValue, orderByChild, orderByKey, push, query, ref, runTransaction, set, update } from 'firebase/database';
import { UserService } from './user.service';
import * as _ from 'underscore';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/customer'
  private _complaints: Complaint[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  saveComplaint(uid: number, complaint: Complaint): Observable<Complaint>{
    return this.http.post<Complaint>(`${this._rootUrl}/${uid}/complaint`,complaint)
  }

  getAllComplaints(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this._rootUrl}/complaints`)
  }

  assignEngineerToComplaint(
    complaintId: number, 
    engineerId: number) : Observable<Complaint>{
      return this.http.put<Complaint>(`${this._rootUrl}/complaint/${complaintId}/engineer/${engineerId}`, null)
  }

  jobNotDone(id: number) : Observable<Complaint>{
    return this.http.put<Complaint>(`${this._rootUrl}/engineer/complaint/${id}`,null);
  }

  resolvedComplaint(id: number) : Observable<Complaint>{
    return this.http.patch<Complaint>(`${this._rootUrl}/engineer/complaint/${id}`,null)
  }

  saveFeedback(complaint: Complaint): Observable<Complaint>{
    return this.http.put<Complaint>(`${this._rootUrl}/complaint`,complaint);
  }
  
  addFirebaseComplaint(id: number, complaint: Complaint){
    // save complaint in user
    let db = getDatabase();
    let newKey = push(ref(db, `users/${id}/complaints`), complaint).key
    let updates: any = {};
    
    updates[`/complaints/${newKey}`] = complaint
    return update(ref(db), updates)
  }

  getFirebaseComplaints(){
    let db = getDatabase();
    let uRef = ref(db, 'complaints');
    onValue(uRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let $key = childSnapshot.key
        this._complaints.push({...childSnapshot.val(), $key});
      });
    }, { onlyOnce: true });
    return this._complaints;
  }

  getFirebaseUserComplaint(id: number): Complaint[] {
    let complaints: Complaint[] = []
    let db = getDatabase();
    let uRef = ref(db, `users/${id}/complaints`)
    onValue(uRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let $key = childSnapshot.key;
        complaints.push({...childSnapshot.val(),$key});
      })
    }, {onlyOnce: true});
    return complaints;
  }

  assignJobToEngineerFirebase(key:string, eid: number){
    let c: Complaint = this._complaints.find((complaint) => complaint.$key === key)!;
    c.engineerId = eid;
    let comp: Complaint = {
      cdate: c.cdate, 
      engineerId: eid,
      complaint: c.complaint,
      jdate: formatDate(new Date(),'YYYY-MM-dd', 'en-US'),
      status: 'ON_GOING',
      service: c.service,
      referenceNo: c.referenceNo,
      customer: c.customer
    };
    let db = getDatabase();

    let updates: any = {};
    updates[`/users/${c.customer?.id}/complaints/${key}`]= comp;
    updates[`/complaints/${key}`]= comp;
    return update(ref(db), updates);
  }

  resolvedComplaintFirebase(key:string){
    let c: Complaint = this._complaints.find((complaint) => complaint.$key === key)!;
    let comp: Complaint = {
      cdate: c.cdate, 
      engineerId: c.engineerId,
      complaint: c.complaint,
      jdate: c.jdate,
      rdate: formatDate(new Date(),'YYYY-MM-dd', 'en-US'),
      status: 'RESOLVED',
      service: c.service,
      referenceNo: c.referenceNo,
      customer: c.customer
    };
    let db = getDatabase();

    let updates: any = {};
    updates[`/users/${c.customer?.id}/complaints/${key}`]= comp;
    updates[`/complaints/${key}`]= comp;
    return update(ref(db), updates);
  }

  jobNotDoneFirebase(key: string){
    let c: Complaint = this._complaints.find((complaint) => complaint.$key === key)!;
    let comp: Complaint = {
      cdate: c.cdate, 
      engineerId: 0,
      complaint: c.complaint,
      jdate: c.jdate,
      rdate: null,
      status: 'ESCALATED',
      service: c.service,
      referenceNo: c.referenceNo,
      customer: c.customer,
      feedback: ''
    };
    let db = getDatabase();

    let updates: any = {};
    updates[`/users/${c.customer?.id}/complaints/${key}`]= comp;
    updates[`/complaints/${key}`]= comp;
    return update(ref(db), updates);

  }
}
