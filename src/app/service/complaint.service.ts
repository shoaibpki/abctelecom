import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../interface/complaint';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private _rootUrl: string = 'http://localhost:8082/abctelecom/customer'

  constructor(private http: HttpClient) { }

  saveComplaint(uid: number, complaint: Complaint): Observable<Complaint>{
    return this.http.post<Complaint>(`${this._rootUrl}/${uid}/complaint`,complaint)
  }
}
