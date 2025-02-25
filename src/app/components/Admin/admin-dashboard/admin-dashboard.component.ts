import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { AlleventsService } from 'src/app/services/allevents.service';
// import { Event } from 'src/app/Event';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
import { EventsService } from 'src/app/services/events.service';
// import { EventServiceService } from 'src/app/services/Eventservice.service';
// import { NotificationserviceService } from 'src/app/services/notificationservice.service';

// import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  @Input()
  notificationCount:number;
  @Input()
  notificationMsg: string[]=[];
  @Output()
  notificationsViewed =new EventEmitter<void>();
  shownotificationMessages = false;

  
  //notificationCount: number = 0;
  notificationMessages: string[] = []
  filteredsearch:Event[]=[];
  eventData:Event[];
  constructor(private route:Router,private attendee:AttendeeserviceService,private events:AlleventsService){
    this.events.getEventData().subscribe((response)=>{
      this.eventData=response;
      console.log(this.eventData);
    });
    
    
  }
  alertfunction():void{
    this.route.navigate(['/alerts']);
  }

  // addNotification(){
  //   this.notification.addNotification();
  //   this.shownotificationMessages= !this.shownotificationMessages;
  //   if(this.shownotificationMessages){
  //     this.notificationsViewed.emit();
  //   }
  //   this.notificationCount=0;
    
  // }
  
  
  
  // showNotifications():void{
  //   this.shownotificationMessages=true;
  //   this.notificationCount=0;
  //   this.notificationsViewed.emit();
  // }


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

 
  handleNotificationViewed():void{
    this.notificationCount=0;
  }


  searchQuery: string = '';
  items: string[] = ['Organizer 1', 'Event 1', 'Attendee 1', 'Event 2', 'Organizer 2'];
  filteredItems: string[] = [];



  filterItems(): void {
    this.filteredItems = this.items.filter(item => 
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


 public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Sales' },
      { data: [28, 48, 40, 19, 86], label: 'Revenue' }
    ]
  };


  logout():void{
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");

    this.route.navigate(['/dashboard'])
  }
}
