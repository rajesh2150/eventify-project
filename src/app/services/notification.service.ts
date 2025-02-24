import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSubject =new Subject<string>();
  message$= this.messageSubject.asObservable();
  
  constructor() { }

  sendMessage(message:string){
    console.log("Sending message",message);
    this.messageSubject.next(message);
  }
  
}
