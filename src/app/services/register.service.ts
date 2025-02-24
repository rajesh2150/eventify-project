import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/Register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  URL:string="http://localhost:9091/eventify/user"

  registerAttendee(regiter:any):Observable<any>{

    return this.http.post(this.URL+"/attendee/register",regiter,{responseType:"json"})

  }

  registerOrganizer(regiter:any):Observable<any>{

    return this.http.post(this.URL+"/organizer/register",regiter,{responseType:"json"})

  }

}
