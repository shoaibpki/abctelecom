import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../interface/complaint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/customer'

  constructor(private http: HttpClient) { }

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
}
