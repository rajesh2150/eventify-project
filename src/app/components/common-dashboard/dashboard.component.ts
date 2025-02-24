import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private router:Router){

  }

  showLogin: boolean = false;
  showRegister: boolean = false;



  // Event data for carousel
  events = [
    {
      title: 'Event 1',
      description: 'This is the description for event 1.',
      image: '../assets/events/event-1.jpg'
    },
    {
      title: 'Event 2',
      description: 'This is the description for event 2.',
      image: '../assets/events/event-2.jpg'
    },
    {
      title: 'Event 3',
      description: 'This is the description for event 3.',
      image: '../assets/events/event-3.jpg'
    },{
      title: 'Event 4',
      description: 'This is the description for event 3.',
      image: '../assets/events/event-4.jpg'
    }
    ,{
      title: 'Event 5',
      description: 'This is the description for event 3.',
      image: '../assets/events/event-5.jpg'
    },
    {
      title: 'Event 6',
      description: 'This is the description for event 3.',
      image: '../assets/events/event-6.jpg'
    }
  ];

  // Keep track of the active index
  activeIndex: number = 0;

  // Function to move to next image
  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.events.length;
  }

  // Function to move to previous image
  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.events.length) % this.events.length;
  }

  buynow(){
    this.router.navigate(['/login'])
  }

  createEvent(){
    this.router.navigate(['/login'])
  }

  
}