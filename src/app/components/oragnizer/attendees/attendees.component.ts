import { Component } from '@angular/core';
import { Attendee } from 'src/app/model/Attendee';
import { AttendeesService } from 'src/app/services/attendees.service';
import { EventOrganizerService } from 'src/app/services/event-organizer.service';
// import { Attendee } from 'src/app/Attendee';
// import { AttendeesService } from 'src/app/services/attendees.service';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css']
})
export class AttendeesComponent {

  attendeeData:Attendee[]=[];




  constructor(private attendeeService: AttendeesService,private allAttendeesByEventId:EventOrganizerService) {
    this.allAttendeesByEventId.getAllAttendeesByEventId(1).subscribe(data => {
      this.attendeeData = data;
      // return this.attendeeData;
      console.log('Attendees:', data[0].attendeeEmail      ); 
      // Check the console for the fetched data
      this.attendeeData=data;

      console.log(this.attendeeData)
    });

   }
}
