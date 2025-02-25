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


  
showUpdate:boolean=true;
  update(event):void{
    console.log(event);
    alert("Event is Updated")
    this.showUpdate=false;
    this.updateService.updateEvent(event).subscribe((data)=>{
      this.selectedEvent=data;
      console.log("selectedEvent",this.selectedEvent);

      
    });
    this.toastService.sendMessage("Event was updated. Click here for more Details");
    //console.log(this.notification);
  }

}
