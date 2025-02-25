import { Component } from '@angular/core';
import { MyEvents } from 'src/app/model/MyEvents';
import { AlleventsService } from 'src/app/services/allevents.service';
import { DeleteService } from 'src/app/services/delete.service';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';
// import { AlleventsService } from 'src/app/services/allevents.service';
// import { DeleteserviceService } from 'src/app/services/deleteservice.service';
// import { Event } from 'src/app/event';
@Component({
  selector: 'app-deleteevent',
  templateUrl: './deleteevent.component.html',
  styleUrls: ['./deleteevent.component.css']
})
export class DeleteeventComponent {

  eventData:MyEvents[]=[];
  searchQuery='';
  filteredEventData;
  constructor(private deleteservice:DeleteService,private service:AlleventsService,private eventService:EventOrganizerService){
    // this.service.getEventData().subscribe((response)=>{
    //   this.eventData=response;
    //   this.filteredEventData=this.eventData;
    //   console.log(this.eventData);
    // });
    let id = parseInt(sessionStorage.getItem("id"));
    this.eventService.getEvents(id).subscribe(res=>{this.eventData=res;
      this.filteredEventData=this.eventData;
      console.log("response data"+this.eventData)});
  }

  deleteMessage:string=""
  delete(eventId){
    this.deleteservice.deleteEvent(eventId).subscribe((data)=>{
      alert("Event is deleted");
      this.eventData=data;
      this.eventData=this.eventData.filter((data)=>data.eventId!=eventId);
    });
    alert("Event is Deleted");
    this.deleteMessage="Event is Deleted"
    
    setTimeout(()=>{
      window.location.reload()
    },2000)

    
  }

  filterfunction(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredEventData = [...this.eventData]; // If no search query, show all events
      //console.log(this.filteredEventData);
    } else {
      this.filteredEventData = this.eventData.filter(event =>
        event.eventTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventLocation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventDescription.toLowerCase().includes(this.searchQuery.toLowerCase())
        //console.log("Events",event.eventType)
      );
      
    }
  }

}
