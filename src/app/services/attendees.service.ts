import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  // URL="http://localhost:9091/eventify/admin/getallattendees";

   id=parseInt(sessionStorage.getItem("id"))-1;

  URL:string =`http://localhost:9091/eventify/organizer/${this.id}/attendees`;

  aURL="http://localhost:9091/eventify/admin/getallattendees";

  constructor(private http:HttpClient) { }
  
  getAttendeeData():Observable<any[]>{
    return this.http.get<any[]>(this.URL);
  }

  getAllAttendeeData():Observable<any[]>{
    return this.http.get<any[]>(this.aURL);
  }

  getEvnetbyAttendeeId(attendeeId):Observable<any[]>{
    console.log(attendeeId)
    const eventsURL=`http://localhost:9091/eventify/admin/eventsByOrganizerId/${attendeeId}`;
    return this.http.get<any[]>(eventsURL);
  }

  updateAttendeeStatus(attendeeId,suspend:boolean):Observable<any>{
    const suspendURL=`http://localhost:9091/eventify/admin/attendee/${attendeeId}/suspend?suspend=${suspend}`;
      return this.http.post(suspendURL,attendeeId);
    }
 

    // http://localhost:9091/api/attendee/getattendeeissuspendedbyid/1

    getAttendeeIsSuspended(id:number):Observable<any>{
      return this.http.get<any>("http://localhost:9091/api/attendee/getattendeeissuspendedbyid/"+id)
    }
}
