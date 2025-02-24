import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient) { }

  deleteEvent(eventId:number):Observable<any>{
    const  URL=`http://localhost:9091/eventify/organizer/deleteevent/${eventId}`
    return this.http.delete(URL)
  }
}
