import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/model/Attendee';
import { MyEvents } from 'src/app/model/MyEvents';
import { AlleventsService } from 'src/app/services/allevents.service';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';
import { OrganizerService } from 'src/app/services/organizer.service';
// import { Event } from 'src/app/event';
// import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  eventData:MyEvents[]=[];
  searchQuery="";
  filteredEventData;
  attendees:Attendee[];
  constructor(private route:Router,private service:EventOrganizerService){
    let id = parseInt(sessionStorage.getItem("id"));
    this.service.getEvents(id).subscribe(res=>{this.eventData=res;
      this.filteredEventData=this.eventData;
      console.log("response data"+this.eventData)

    })
  
  }

  filterfunction(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredEventData = [...this.eventData]; // If no search query, show all events
      console.log(this.filteredEventData);
    } else {
      this.filteredEventData = this.eventData.filter(event =>
        event.eventTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventLocation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventDescription.toLowerCase().includes(this.searchQuery.toLowerCase())
        //console.log("Events",event.eventTitle)
      );
      
    }
  }
  showAttendees:boolean=false

  attendeesList(e:MyEvents):void{
   
    this.service.getAllAttendeesByEventId(e.eventId).subscribe((attendee)=>{
      this.attendees=attendee;
      console.log(attendee)
     
    });
  }
}
