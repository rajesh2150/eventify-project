import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { MyEvents } from './model/MyEvents';
import { HttpClient } from '@angular/common/http';
// import { Eventify } from '../EventifyAdminURL';
import { MyEvents } from '../model/MyEvents';
import { Eventify } from '../EventifyAdminURL';
// import { Eventify } from './EventifyAdminURL';


@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  // constructor() { }


    constructor(private http: HttpClient,@Inject(Eventify) private url:Eventify) { }
  
  
    getAllAttendeesByEventId(id:number):Observable<any>{
      console.log("id from service"+id)
  
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

    URL="http://localhost:9091/eventify/admin/getallorganizers";

    getData():Observable<any[]>{
      return this.http.get<any[]>(this.URL);
    }


    updateOrganizerStatus(organizerId,suspend:boolean):Observable<any>{
    const suspendURL=`http://localhost:9091/eventify/admin/organizer/${organizerId}/suspend?suspend=${suspend}`;
      return this.http.post(suspendURL,organizerId);
    }

    
    
    getEvnetbyOrganizerId(organizerId):Observable<any[]>{
      const eventsURL=`http://localhost:9091/eventify/admin/eventsByOrganizerId/${organizerId}`;
      return this.http.get<any[]>(eventsURL);
    }

    getOrganizerIsSuspended(id:number):Observable<any>{
      return this.http.get<any>("http://localhost:9091/eventify/organizer/getorganizerissuspendedbyid/"+id)
    }
}
