import { Component } from '@angular/core';
import { MyEvents } from 'src/app/model/MyEvents';
import { Organizer } from 'src/app/model/Organizer';
import { OrganizerService } from 'src/app/services/organizer.service';
// import { Organizer } from 'src/app/Organizer';
// import { NotificationserviceService } from 'src/app/services/notificationservice.service';
// import { OrganizerServiceService } from 'src/app/services/organizer-service.service';
// import { Event } from 'src/app/Event';
@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent {

  // isSuspended:boolean=false
  data:Organizer[]=[];
  events:MyEvents;
  notificationCount:number=0;
  notificationMsg: string[]=[];
  shownotificationMessages=false;
  searchQuery:string="";
  filteredData:Organizer[];

    // isSuspended:boolean=false;
  constructor(private service:OrganizerService){
    this.service.getData().subscribe(response => {
    this.data=response;
    this.filteredData = this.data; //-----------> Organizers data is saved here in flitereddata
    console.log(this.data)
      return this.data;
    });
    
  }

  // eventsbyOrganizerid

  suspendfunction(o:Organizer):void{
    // this.notification.addNotification();
    o.organizerIsSuspended=true;
    this.service.updateOrganizerStatus(o[1],true).subscribe(response=>{
     //console.log(o[0]);
     const message=`Organizer ${o[1]} has been suspended.`;
     this.notificationMsg.push(message);
     this.notificationCount++;
      console.log('Organizer suspended',response);
    })
  //   if (o && o.organizerId) {
  //     this.notification.addNotification();
  //     o.isSuspended = true;
  //     this.service.updateOrganizerStatus(o, true).subscribe(response => {
  //       console.log(o.organizerId);
  //         console.log('Organizer suspended:', response);
  //     });
  // } else {
  //     console.error('Organizer object or ID is undefined.');
  // }
  }

  activefunction(o:Organizer):void{
    o.organizerIsSuspended=false;
    this.service.updateOrganizerStatus(o[1],false).subscribe(response=>{
      console.log('Organizer activated:',response);
    })
  }

  eventsbyOrganizerid(o:Organizer):void{
    this.service.getEvnetbyOrganizerId(o[0]).subscribe(response=>{
      this.events=response[0];

      console.log("Events",this.events.eventDescription)
      // console.log(response[0].eventDescription)
      // this.events=response;
      // console.log(this.events[0].eventDescription);
    })
  }

  filterfunction(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data; // Show all data if search query is empty
    } else {
      this.filteredData = this.data.filter(d =>
        d.organizerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        d.organizerEmail.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

}
