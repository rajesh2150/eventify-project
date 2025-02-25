import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { EventsService } from 'src/app/services/events.service';
// import { Event } from 'src/app/event';
import { HttpClient } from '@angular/common/http';
import { MyEvents } from 'src/app/model/MyEvents';
import { Organizer } from 'src/app/model/Organizer';
import { EventsService } from 'src/app/services/events.service';
import { OrganizerService } from 'src/app/services/organizer.service';
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent {





  event: MyEvents = {
    eventTitle: '',
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: '',
    eventPrice: 0,
    eventType: '',
    totalTickets: 0,
    eventDescription: '',
    totalReceivedAmount: 0,
    isSuspended: false,
    payToPlatform: 200,
    // organizer: parseInt(sessionStorage.getItem("id"))
    organizerId:0
  };
  
  isSuspended:boolean=false;
  constructor(private router: Router, private eventService: EventsService,private h:HttpClient,private organizerService:OrganizerService) {
    
    console.log(sessionStorage.getItem("id"))

    let id=parseInt(sessionStorage.getItem("id"));
    this.organizerService.getOrganizerIsSuspended(id).subscribe(response=>this.isSuspended=response)
  }

 
  showForm:boolean=true
  showPayment:boolean=false
  payToPlatform:number=200;
  next():void{
this.showPayment=true
this.showForm=false 
// console.log(this.event)
    // this.router.navigate(['/payment']);
  }

  

  platform() :void{

    

    // this.router.navigate(['/paytoplatform']);
  }


  // showPayment: boolean = true;
  isProcessing = false;
  paymentSuccess = false;

  amount: number = 100;
  transactionId: number = Math.floor(Math.random() * 1000000); // Random transaction ID

  showSuceess:boolean=false;

  pay() {
    this.isProcessing = true;

    
    console.log(sessionStorage.getItem("id"))
    
    let oId=parseInt(sessionStorage.getItem("id"))

    setTimeout(() => {
      this.showPayment = false;
      this.isProcessing = false;
      this.paymentSuccess = true;
    }, 2000); // Simulating payment processing delay

  
    this.event.organizerId=oId;

    console.log(oId)

    let addingEvent=this.event;

    console.log("event with oId"+this.event.organizerId)

    console.log(this.event)

    this.event.payToPlatform=200;

    this.eventService.addEvent(this.event).subscribe((response)=>{
      console.log("payimg..")
      this.event=response;
      this.showSuceess=true;
      console.log(this.event)
    })
  }
  

}
