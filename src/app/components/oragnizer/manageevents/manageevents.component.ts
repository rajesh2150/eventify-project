import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/model/Attendee';
import { MyEvents } from 'src/app/model/MyEvents';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';

@Component({
  selector: 'app-manageevents',
  templateUrl: './manageevents.component.html',
  styleUrls: ['./manageevents.component.css']
})
export class ManageeventsComponent {

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


  getEventImagePath(eventType: string): string {
    return `../../../assets/events-images/${eventType}.jpg`;
  }

}
