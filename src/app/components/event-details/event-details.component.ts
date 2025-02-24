import { Component } from '@angular/core';
// import { AttendeeserviceService } from '../attendeeservice.service';
// import { MyEvents } from '../Myclass/MyEvents';
import { ActivatedRoute, Router } from '@angular/router';
import { MyEvents } from 'src/app/model/MyEvents';
import { AttendeesService } from 'src/app/services/attendees.service';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
// import { AttendeeserviceService } from '../services/attendeeservice.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {


  event:MyEvents;
  str:string;

  // constructor(private service2: AttendeesService,private service:AttendeeserviceService, private router:Router,private login:LoginService) { 
   
  //   let id=parseInt(sessionStorage.getItem("id"))
  // this.service2.getAttendeeIsSuspended(id).subscribe(res=>this.isSuspended=res)
      
  //   }

  isSuspended:boolean=false;
  
  constructor(private as:AttendeeserviceService, private router:Router, private r: ActivatedRoute,private service2: AttendeesService){
    this.str= this.r.snapshot.params['eventTitle'];

    this.as.getEventByTitle(this.str).subscribe(res=>sessionStorage.setItem("eventId",res.eventId    ))

    this.as.getEventByTitle(this.str).subscribe({
      next: (res) => {
        this.event = res; // Store the fetched event details in the event object
        console.log(this.event);
      },
      error: (err) => {
        console.error(err);
      }
    });


       let id=parseInt(sessionStorage.getItem("id"))
  this.service2.getAttendeeIsSuspended(id).subscribe(res=>this.isSuspended=res)
  }
  bookNow(event: MyEvents): void {
    console.log("Selected Event: ", event.eventTitle);  
    let title = event.eventTitle;
    console.log(title)
  this.router.navigate(['/booking', title]);
  }

  logout():void{

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("eventId")

    this.router.navigate([''])
    
  }


  getEventImagePath(eventType: string): string {
    return `../../../assets/events-images/${eventType}.jpg`;
  }
  

  getEventsByAttendeeId(): void{
      
    this.router.navigate(['/feedback']);
    // let id =sessionStorage.getItem("id")
    // this.service.getEventsByAttendeeId(parseInt(id)).subscribe((res)=>this.a=res);
  }


backToHome(){
 
  this.router.navigate(['/attendeedashboard'])
}
  
  // logout():void{

  //   sessionStorage.removeItem("email")
  //   sessionStorage.removeItem("id")
  //   sessionStorage.removeItem("eventId")

  //   this.router.navigate([''])
    
  // }
} 
