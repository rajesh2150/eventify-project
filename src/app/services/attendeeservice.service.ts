import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attendee } from '../model/Attendee';
import { TicketBooking } from '../model/TicketBooking';
import { Feedback } from '../model/Feedback';
import { Eventify } from '../EventifyAdminURL';
// import { Attendee } from '../Myclass/Attendee';
// import { TicketBooking } from '../Myclass/TicketBooking';
// import { Feedback } from '../Myclass/Feedback';
//   import { TicketBooking } from './Myclass/TicketBooking';
// import { Feedback } from './Myclass/Feedback';
// import { Attendee } from './Myclass/Attendee';

@Injectable({
  providedIn: 'root'
})
export class AttendeeserviceService {
  URL: string="http://localhost:9091/api/attendee";
  constructor(private http:HttpClient,private url:Eventify) { }
  public getAllEventsByType(type: string): Observable<any>{
    return this.http.get(this.URL+"/getalleventsbytype/"+type);
  }
  //  public getAllEventsByDate(date: Date): Observable<any>{
  //  return this.http.get(this.URL+"/getalleventsbydate/"+date);
  //  }
  private loggedInAttendee: Attendee = { attendeeId: 0,
    attendeeName: "",
    attendeeEmail: "",
    attendeePassword: "",
    attendeePhoneNumber: "",
    attendeeIsSuspended: false,
    role :""}; // Store the logged-in attendee's details

  getLoggedInAttendee(): Observable<Attendee> {
    return of(this.loggedInAttendee); // Replace with actual logic to fetch logged-in attendee
  }

  public getAllEventsByDate(date: string): Observable<any> {
    return this.http.get(this.URL + "/getalleventsbydate/" + date);
  }
  

  public getAllEventsByEventLocation(location: string): Observable<any>{
    return this.http.get(this.URL+"/getalleventsbylocation/"+location);
  }

  public buyTicket(tb: TicketBooking): Observable<any>{
    return this.http.post(this.URL+"/buyticket",tb,{responseType:'json'});
  }
  
  public getAllEvents(): Observable<any>{
    return this.http.get<any>(this.URL+"/getallevents");
  }

  public giveFeedback(f: Feedback): Observable<any>{
    return this.http.post(this.URL+"/givefeedback",f);
  }

  // http://localhost:9091/eventify/admin/eventsByAttendeeId/1

public getEventsByAttendeeId(aId: number): Observable<any>{
  console.log(aId)
  return this.http.get(this.URL+"/getalleventsbyattendeeId/"+aId);
}

  getEventByTitle(eventTitle: string): Observable<any> {
    console.log(eventTitle);
    
    return this.http.get<any>(`http://localhost:9091/eventify/organizer/event/${eventTitle}`);
  }
  
}
