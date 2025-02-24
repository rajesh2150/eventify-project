import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyEvents } from 'src/app/model/MyEvents';
import { EventsService } from 'src/app/services/events.service';
// import { Event } from 'src/app/event';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  event:MyEvents;
  paymentForm:FormGroup;
  constructor(private form:FormBuilder,private route:Router,private eventservice:EventsService){
      this.paymentForm=this.form.group({
         payToPlatform:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]$')])
      });
    }

    onSubmit(): void {
      if (this.paymentForm.valid) {
        const event = this.paymentForm.value;
        this.eventservice.addEvent(this.event).subscribe((response)=>{
          console.log("payimg..")
          this.event=response;
        })
        console.log('Event:', event);
        // console.log(this.addEventForm);
        // Handle the event data, e.g., send it to a server
      }
    }    
}
