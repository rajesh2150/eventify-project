import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/model/Attendee';
import { MyEvents } from 'src/app/model/MyEvents';
import { TicketBooking } from 'src/app/model/TicketBooking';
// import { EventOrganizerService } from 'src/app/services/event-organizer.service';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';
import { OrganizerService } from 'src/app/services/organizer.service';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent {

  events: MyEvents[];
  attendees: Attendee[] = [];
  ticketBookings: TicketBooking[] = []; 
  eventRevenue: number = 0;

isSuspended:boolean=false;

  constructor(private eventOrganizerService:OrganizerService,private http: HttpClient,private sanitizer: DomSanitizer,private route:Router,private service:EventOrganizerService) {
    let id :number;
    // this.eventOrganizerService.getAllAttendeesByEventId(1).subscribe(res=>this.eventData=res) // need to change

    let email:string=sessionStorage.getItem("email")
 
    this.service.getOrganizerIdByEmail(email).subscribe((res)=>{
      console.log(' hey response '+res);
      id=res.id;

      sessionStorage.setItem("id",res.id)
      console.log('keerti '+id);
      this.service.getEvents(1).subscribe(res=>this.events=res)
      
      
    }

    )

    let oId=parseInt(sessionStorage.getItem("id"))
    this.eventOrganizerService.getOrganizerIsSuspended(oId).subscribe(res=>this.isSuspended=res)
  }

  

   ngOnit():void{
     
     let email:string=sessionStorage.getItem("email")
     
     this.service.getOrganizerIdByEmail(email).subscribe(res=>{
       console.log(res.id);
       sessionStorage.setItem("id",res.id)
      let oId:number= parseInt(sessionStorage.getItem("id"));
      console.log("OId is "+oId)
       this.eventOrganizerService.getAllAttendeesByEventId(oId).subscribe(res=>this.eventData=res) // need to change
    }

    
    )

    let id = parseInt(sessionStorage.getItem("id"))
    this.service.getEvents(id).subscribe(res=>this.events=res)

    
   }

   eventData:MyEvents[];
  searchEvent:MyEvents[];
  searchtext:string;
  
  // constructor(,private toastService:NotificationService){
  //   // this.service.getEvents(organizerId).subscribe((response)=>{
  //   //   this.eventData=response;
  //   //   console.log(this.eventData);
  //   //s});
  // }

  dashboard():void{
    this.route.navigate(['/dashboard']);
  }
  alerts():void{
    this.route.navigate(['/alerts']);
  }

  isUserDetailsVisible: boolean = false; // Toggle visibility of user details
  user = {
    
    email: sessionStorage.getItem("email"),
    
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


  
   getAllAttendeesByEventId():void{
    this.eventOrganizerService.getAllAttendeesByEventId(1).subscribe(res=>console.log(res))
   }


   add(event:MyEvents):void{

    this.eventOrganizerService.addEvent(event).subscribe(res=>console.log(res))
   }
   selectedFile: File | null = null;
   retrievedImage: any;
  
   //constructor(private http: HttpClient) {}
  
   onFileSelected(event: any) {
     this.selectedFile = event.target.files[0];
     console.log(this.selectedFile)
   }
  
   uploadImage() {
     if (!this.selectedFile) {
       alert("Please select an image!");
       return;
     }
  
     const formData = new FormData();
     formData.append('image', this.selectedFile);
  
     this.http.post('http://localhost:9091/eventify/organizer/upload', formData,{responseType:"json"}).subscribe(response => {
       console.log("Image uploaded successfully",response);
     }, error => {
       console.error("Error uploading image", error);
     });
   }
  
  
  
  
  logout():void{
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("role")
    this.route.navigate(['/dashboard'])
  }
}





// retrieveImage() {
//   this.http.get('http://localhost:9091/eventify/organizer/event/Tech Conference 2025/image', 
//   { responseType: 'arraybuffer' }).subscribe(response => {

//     console.log(response);

//     let blob = new Blob([response], { type: 'image/jpeg' });  // Ensure correct MIME type
//     let imageUrl = URL.createObjectURL(blob);

//     this.retrievedImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);  // Trust the URL

//   }, error => {
//     console.error("Error retrieving image", error);
//   });
// }