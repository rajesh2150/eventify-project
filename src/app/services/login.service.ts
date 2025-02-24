import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventify } from '../EventifyAdminURL';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  URL:string="http://localhost:9091/eventify/user";

   AURL:string="http://localhost:9091/api/attendee"

  adminURL:Eventify=  new Eventify();


  public login(email:string,password:string):Observable<any>{

    return this.http.get<any>(this.URL + "/attendee/login/"+email+"/"+password);


  }

  public organizerLogin(email:string,password:string):Observable<any>{

    return this.http.get<any>(this.URL + "/organizer/login/"+email+"/"+password);

  }

  public adminLogin(email:string, password:string):Observable<any>{
    
    console.log("admin..")

    return this.http.get<any>(this.adminURL.AdminURL+"/login/"+email+"/"+password)
  }


  public getAttendeeId(email:string):Observable<any>{
    return this.http.get<any>(this.AURL+"/"+email)
  }
}
