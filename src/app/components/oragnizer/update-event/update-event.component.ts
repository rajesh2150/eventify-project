import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlleventsService } from 'src/app/services/allevents.service';
// import { Event } from 'src/app/event';
import { UpdateeventService } from 'src/app/services/updateevent.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MyEvents } from 'src/app/model/MyEvents';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit{

  // event: Event[];
  // message:string;
  // searchtext:string;
  selectEvent;
  @Input()
  selectedEvent:MyEvents;
  // @Output()
  // updateEvent=new EventEmitter<Event>();

  constructor(private route:Router,private updateService:UpdateeventService,private toastService:NotificationService){
    
  }
  ngOnInit(): void {
    
    console.log("selectItem",this.selectedEvent);
    
  }
//   searchedevent:Event[]=[];
//   events:Event[]=[];
  
//   loadEvents():void{
//     this.alleventsservice.getEventData().subscribe((response)=>{
//       this.events=response;
//       //console.log(this.events);
//   });
// }

  // searchFunction():void{
  //     this.searchedevent=this.events.filter((data)=>data.eventTitle.toLowerCase().includes(this.searchtext.toLowerCase()));
  //     this.event=this.searchedevent;
  //     console.log(this.searchedevent);
  // }

  update(event):void{
    console.log(event);
    this.updateService.updateEvent(event).subscribe((data)=>{
      this.selectedEvent=data;
      console.log("selectedEvent",this.selectedEvent);
      
    });
    this.toastService.sendMessage("Event was updated. Click here for more Details");
    //console.log(this.notification);
  }

}
