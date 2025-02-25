import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { MyEvents } from 'src/app/model/MyEvents';
import { AlleventsService } from 'src/app/services/allevents.service';
import { EventsService } from 'src/app/services/events.service';
// import { Event } from 'src/app/Event';
// import { EventServiceService } from 'src/app/services/Eventservice.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class AdminEventsComponent implements OnInit{
  searchQuery:string="";
  eventData:MyEvents[]=[];
  filteredEventData;
  constructor(private route:Router,private service:AlleventsService){
    this.service.getEventData().subscribe((response)=>{
      this.eventData=response;
      this.filteredEventData=this.eventData;
      return this.eventData;
    });
  }

  ngOnInit() {
    // Initialize the filteredEventData with all event data when the component is loaded
    //this.filteredEventData = [...this.eventData];
  }

  cancelFunction(e:MyEvents):void{
      e.isSuspended=true;
    }
  
  updatefunction(e:MyEvents):void{
    e.isSuspended=false;
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
      );
    }
  }

  backToHome():void{
    this.route.navigate(['/admin/dashboard'])
  }

}
