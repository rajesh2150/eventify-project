import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/model/Attendee';
import { Feedback } from 'src/app/model/Feedback';
import { MyEvents } from 'src/app/model/MyEvents';
import { Organizer } from 'src/app/model/Organizer';
import { TicketBooking } from 'src/app/model/TicketBooking';
import { AttendeesService } from 'src/app/services/attendees.service';
// import { AttendeeserviceService } from 'src/app/attendeeservice.service';
// import { Attendee } from 'src/app/Myclass/Attendee';
// import { Feedback } from 'src/app/Myclass/Feedback';
// import { MyEvents } from 'src/app/Myclass/MyEvents';
// import { Organizer } from 'src/app/Myclass/Organizer';
// import { TicketBooking } from 'src/app/Myclass/TicketBooking';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-atendee-dashboard',
  templateUrl: './atendee-dashboard.component.html',
  styleUrls: ['./atendee-dashboard.component.css']
})
export class AtendeeDashboardComponent {



    events: MyEvents[] = [];
    events1: MyEvents[] = [];
    bookings: TicketBooking[] = [];
    feedback: Feedback;
    
    // Flag to track if filtering is done
    isFiltered: boolean = false;
  
    ngOnInit(): void {
      this.getAllEvents(); // Fetch events as soon as the component loads

      this.service.getLoggedInAttendee().subscribe((attendee) => {
        this.a = attendee; // Set the attendee's details
        console.log("Logged-in Attendee:", this.a);
        
        this.email=  sessionStorage.getItem("email");

        this.login.getAttendeeId(this.email).subscribe(res=>sessionStorage.setItem("id",res.id))

      });

     

       
    }
    a:Attendee={
      
        attendeeId: 0,
        attendeeName: "",
        attendeeEmail: "",
        attendeePassword: "",
        attendeePhoneNumber: "",
        attendeeIsSuspended: false,
        role :""
      
      

    };
    
    e: MyEvents = {
      eventId: 0,
      eventTitle: "",
      eventDescription: "",
      eventStartTime: "",
      eventEndTime: "",
      eventLocation: "",
      eventPrice: 0,
      eventType: "",
      totalTickets: 0,
      totalReceivedAmount: 0,
      payToPlatform: 0,
      organizerId:parseInt(sessionStorage.getItem("id")),
    };
  
    b: TicketBooking = {
      bookingDate: "",
      transactionId: "",
      transactionMode: "",
      totalCost: 0,
      status: "",
      attendeeId:0,
      event: 0
    };
  f: Feedback={
    feedbackId: 0,
    rating: 0,
    comment: "",
    attendeeId: 0,
    eventId: 0
  };

    message: string = '';
    showBookingForm: boolean = false;  // Flag to show or hide the booking form
    selectedEvent: MyEvents; // To store the selected event for booking
  

    //suspended

    isSuspended:boolean=false;

    constructor(private service2: AttendeesService,private service:AttendeeserviceService, private router:Router,private login:LoginService) { 
   
    let id=parseInt(sessionStorage.getItem("id"))
  this.service2.getAttendeeIsSuspended(id).subscribe(res=>this.isSuspended=res)
      
    }
  
email:string;
// ngOnInit(){

//  this.email=  sessionStorage.getItem("email");

//   this.login.getAttendeeId(this.email).subscribe(res=>sessionStorage.setItem("id",res.id))
// }

showAll:boolean=false;

    getEventsByType(): void {
      this.isFiltered = true;
      if (this.e.eventType) {
        this.service.getAllEventsByType(this.e.eventType).subscribe({
          next: (events) => {
            this.events = events;  // Update the filtered events
            console.log(events);
            this.showAll=true;
            if (events.length === 0) {
              this.message = "No events found for this type!";
            } else {
              this.message = '';
            }
          },
          error: (err) => {
            console.error(err);
            this.message = "An error occurred while fetching events.";
          }
        });
      } else {
        this.message = "Please enter a valid event type.";
      }
    }
    
    getEventImagePath(eventType: string): string {
      return `../../../assets/events-images/${eventType}.jpg`;
    }
    

    getEventsByDate(): void {
      this.isFiltered = true;
      if (!this.e.eventStartTime) {
        this.message = "Please enter a valid event date.";
        return;
      }
    
      const eventDate = new Date(this.e.eventStartTime);
      this.e.eventStartTime = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}T${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}:${String(eventDate.getSeconds()).padStart(2, '0')}.000000`;
    
      this.showAll = true;
      this.service.getAllEventsByDate(this.e.eventStartTime).subscribe({
        next: (events) => {
          this.events = events;
          this.message = events.length ? '' : "No events found for this date!";
        },
        error: () => (this.message = "An error occurred while fetching events."),
      });
    }
    
  
    getEventsByLocation(): void {
      this.isFiltered = true;
      if (this.e.eventLocation) {
        this.showAll=true;
        this.service.getAllEventsByEventLocation(this.e.eventLocation).subscribe({
          next: (events) => {
            this.events = events;  // Update the filtered events
            console.log(events);
            if (events.length === 0) {
              this.message = "No events found for this location!";
            } else {
              this.message = '';
            }
          },
          error: (err) => {
            console.error(err);
            this.message = "An error occurred while fetching events.";
          }
        });
      } else {
        this.message = "Please enter a valid event location.";
      }
    }
    
    // Handle the "Book Now" button click


    bookNow(event: MyEvents): void {
      console.log("Selected Event: ", event.eventTitle);  
      let title = event.eventTitle;
      console.log(title)
    this.router.navigate(['/eventname', title]);
    }
    
    
    getAllEvents(): void {
      this.showAll=false;
      this.service.getAllEvents().subscribe((events) => {
        this.events1 = events;  // Populate the default list only
        this.events = [];  // Clear the filtered events
        console.log(this.events1);
      });
    }


    giveFeedback(): void{
      this.service.giveFeedback(this.f).subscribe((f)=> this.feedback=f);
    }

    getEventsByAttendeeId(): void{
      console.log("clicked")
      
      this.router.navigate(['/feedback']);
      // let id =sessionStorage.getItem("id")
      // this.service.getEventsByAttendeeId(parseInt(id)).subscribe((res)=>this.a=res);
    }

    logout():void{

      sessionStorage.removeItem("email")
      sessionStorage.removeItem("id")
      sessionStorage.removeItem("eventId")

      this.router.navigate([''])
      
    }


  
 
}
