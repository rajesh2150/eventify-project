import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/model/Attendee';
import { MyEvents } from 'src/app/model/MyEvents';
import { AttendeesService } from 'src/app/services/attendees.service';
// import { Attendee } from 'src/app/Attendees';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
// import { Event } from 'src/app/Event';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css']
})
export class AdminAttendeesComponent implements OnInit{

  attendeeData:Attendee[]=[];
  events:MyEvents[];
  searchQuery="";
  filteredAttendee;
  constructor(private attendeeService: AttendeeserviceService,private as:AttendeesService,private router:Router) {
    this.as.getAllAttendeeData().subscribe(data => {
      this.attendeeData = data;
      this.filteredAttendee=this.attendeeData;

      // return this.attendeeData;
      console.log('Attendees:', data[0]); // Check the console for the fetched data
    });

   }

  ngOnInit(): void {
    this.filteredAttendee=this.attendeeData;
  }
  

  suspendfunction(o:Attendee):void{
      o.attendeeIsSuspended=true;
      this.as.updateAttendeeStatus(o[0],true).subscribe(response=>{
        console.log("Attendee suspended",response);
      })
    }
  
    activefunction(o:Attendee):void{
      o.attendeeIsSuspended=false;
      this.as.updateAttendeeStatus(o[0],false).subscribe(response=>{
        o.attendeeIsSuspended=false;
        console.log("Attendee Activated",response);
      })
    }

    getevents(a:Attendee):void{
      console.log("Attandee",a[0]);
      this.as.getEvnetbyAttendeeId(a[0]).subscribe((response)=>
        //console.log(response);
      this.events=response);
      console.log("attendee Id",this.events);
      
    
    }


    filterfunction(): void {
      if (this.searchQuery.trim() === '') {
        this.filteredAttendee = this.attendeeData; // If no search query, show all events
        
      } else {
        this.filteredAttendee = this.attendeeData.filter(event =>
          event.attendeeName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.attendeeEmail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.attendeeId.toString().includes(this.searchQuery.toLowerCase()) 
          //console.log("sjdhuwhes",event[0])
        );
      }
    }


    
  isUserDetailsVisible: boolean = false; // Toggle visibility of user details
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123456789',
    address: '1234 Main St, City, Country'
  };

  profile(event: MouseEvent) {
    // Prevent the click event on the user icon from triggering the document click listener
    event.stopPropagation();
    this.isUserDetailsVisible = !this.isUserDetailsVisible;
  }

  // Close the card if click happens outside
  @HostListener('document:click', ['$event'])
  closeCard(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    
    if (this.isUserDetailsVisible && 
        !clickedElement.closest('.user-details-card') && 
        !clickedElement.closest('.user-icon-container')) {
      this.isUserDetailsVisible = false;
    }
  }

  // Stop propagation of click events when inside the card
  stopClickPropagation(event: MouseEvent) {
    event.stopPropagation();
  }


  backToHome():void{
    this.router.navigate(['/admin/dashboard'])
  }
 
  // handleNotificationViewed():void{
  //   this.notificationCount=0;
  // }

}
