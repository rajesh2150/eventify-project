import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../model/Attendee';
import { TicketBooking } from '../model/TicketBooking';
import { MyEvents } from '../model/MyEvents';
import { Eventify } from '../EventifyAdminURL';
// import { Event } from './event.model'; // Define your Event model
// import { TicketBooking } from './ticket-booking.model'; // Define your TicketBooking model
// import { Attendee } from './attendee.model'; // Define your Attendee model

@Injectable({
  providedIn: 'root'
})
export class EventOrganizerService {

  // private URL = 'http://localhost:9091/api/organizer'; // Backend URL, adjust as needed




  constructor(private http: HttpClient,private url:Eventify) { }

  getEvents(organizerId:number):Observable<any[]>{
    console.log(' hello rajehs'+typeof(organizerId));
    const URL='http://localhost:9091/eventify/admin/eventsByOrganizerId/'+organizerId;
    return this.http.get<any[]>(URL);
  }

  getAllAttendeesByEventId(id:number):Observable<any>{

    return this.http.get<any>(this.url.OrganizerURL+"/getallattendeesbyeventid/"+id);

  }



  addEvent(event:MyEvents):Observable<any>{
    return this.http.post(this.url.OrganizerURL+"/addevent",event,{responseType:"json"});
  }


  updateEvent(event:MyEvents):Observable<any>{
    return this.http.put(this.url.OrganizerURL+"/updateevent",event,{responseType:"json"})
  }

  deleteEvent(id:number):Observable<any>{
    return this.http.delete(this.url.OrganizerURL+"/deleteevent/"+id)
  }

  getAllTicketBookingsByEventId(id:number):Observable<any>{
    return this.http.get<any>(this.url.OrganizerURL+"/getallticketbookingsbyeventid/"+id)
  }



  showAllRevenueByEvent(id:number):Observable<any>{
    return this.http.get<any>(this.url.OrganizerURL+"  /showeventrevenue/"+id)
  }


  getOrganizerIdByEmail(email:string):Observable<any>{
  
    return this.http.get<any>(this.url.OrganizerURL+"/"+email)
  }




}
