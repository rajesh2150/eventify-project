import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyEvents } from 'src/app/model/MyEvents';
import { AlleventsService } from 'src/app/services/allevents.service';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';
import { UpdateeventService } from 'src/app/services/updateevent.service';
// import { UpdateeventService } from 'src/app/services/updateevent.service';
// import { Event } from 'src/app/event'; 
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  //event: Event[]=[];
  //searchtext:string;
  eventData:MyEvents[]=[];
  selectedEvent:MyEvents;
  searchQuery="";
  filteredAttendee;

    constructor(private route:Router,private deleteservice:UpdateeventService,private alleventsservice:AlleventsService,private es:EventOrganizerService){
      this.alleventsservice.getEventData().subscribe((response)=>{
        this.eventData=response;
        console.log(this.eventData);
        this.filteredAttendee=this.eventData;
      });
      let id = parseInt(sessionStorage.getItem("id"));
      this.es.getEvents(id).subscribe(res=>this.eventData=res)
    }

    updateEvent(event:MyEvents):void{
      //this.route.navigate(['/updateEvents']);
      // this.events.filter((data)=>data.eventTitle.toLowerCase().includes(this.searchtext.toLowerCase()));
      
      this.selectedEvent=event;
      
      // console.log(this.event);
        // console.log(this.searchedevent);
    }
   
    filterfunction(): void {
      if (this.searchQuery.trim() === '') {
        this.filteredAttendee = this.eventData; // If no search query, show all events
        
      } else {
        this.filteredAttendee = this.eventData.filter(event =>
          event.eventTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.eventLocation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.eventType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.eventDescription.toLowerCase().includes(this.searchQuery.toLowerCase())
          //console.log("sjdhuwhes",event.eventTitle)
        );
      }
    }
  
    showUpdate:boolean=false;


}
