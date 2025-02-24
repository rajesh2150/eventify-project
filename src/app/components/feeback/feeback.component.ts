import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/model/Feedback';
import { MyEvents } from 'src/app/model/MyEvents';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feeback',
  templateUrl: './feeback.component.html',
  styleUrls: ['./feeback.component.css']
})
export class FeebackComponent {
  attendeeEvents: MyEvents[] = [];
  showForm: boolean = false; // To show/hide feedback form
  selectedEvent: MyEvents | null = null;


 
  // Feedback object
  feedbackData: Feedback = {
    eventId: 0,
    attendeeId: parseInt(sessionStorage.getItem("id") || '0'), // Get attendee ID from session
    comment: "",
    rating: 0,
    eventTitle: ""
  };

  constructor(private service: AttendeeserviceService, private fs: FeedbackService,private router:Router) {
    let id = sessionStorage.getItem("id");
    if (id) {
      this.service.getEventsByAttendeeId(parseInt(id)).subscribe((res) =>this.attendeeEvents=res);
    }
  }

  feedback(event: MyEvents): void {
    this.selectedEvent = event;
    this.feedbackData.eventId = event.eventId;
    this.feedbackData.eventTitle = event.eventTitle;
    this.showForm = true;  // Show feedback form
  }

  onSubmit(): void {
    this.fs.sendFeedback(this.feedbackData).subscribe(res => {
      console.log("Feedback submitted: ", res);
      this.showForm = false; // Hide form after submission
      this.selectedEvent = null;
    });
  }
  getEventsByAttendeeId(): void{
      
    this.router.navigate(['/feedback']);
    // let id =sessionStorage.getItem("id")
    // this.service.getEventsByAttendeeId(parseInt(id)).subscribe((res)=>this.a=res);
  }

  backToHome(){
    this.router.navigate(['/attendeedashboard'])
  }

  logout():void{

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("eventId")

    this.router.navigate([''])
    
  }
}
