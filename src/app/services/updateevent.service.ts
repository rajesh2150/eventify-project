import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Event } from '../event';
import { Observable } from 'rxjs';
import { MyEvents } from '../model/MyEvents';

@Injectable({
  providedIn: 'root'
})
export class UpdateeventService {
  //URL = "http://localhost:9091/eventify/organizer/updateevent";
  constructor(private http:HttpClient) { }
  updateEvent(event:MyEvents):Observable<any>{
    return this.http.put("http://localhost:9091/eventify/organizer/updateevent",event,{responseType:"json"})
  }
}
