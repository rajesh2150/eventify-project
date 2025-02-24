import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Event } from '../event';
import { MyEvents } from '../model/MyEvents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  //URL:"http://localhost:9091/api/organizer/addevent";
  constructor(private http:HttpClient) {
    
   }

   addEvent(event:MyEvents):Observable<any>{
    console.log("service"+event.organizerId);
    console.log(event)
    return  this.http.post<any>("http://localhost:9091/eventify/organizer/addevent",event);
    
   }

   
}
