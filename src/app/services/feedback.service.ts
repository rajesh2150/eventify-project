import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Feedback } from '../Myclass/Feedback';
import { Observable } from 'rxjs';
import { Feedback } from '../model/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }


  URL:string = "http://localhost:9091/api/attendee"

  sendFeedback(feedback:Feedback):Observable<any>{
    return this.http.post(this.URL+"/givefeedback",feedback,{responseType:"json"})
  }
}
