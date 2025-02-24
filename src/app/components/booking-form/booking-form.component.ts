import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyEvents } from 'src/app/model/MyEvents';
import { TicketBooking } from 'src/app/model/TicketBooking';
import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  selectedEvent: MyEvents;
  b: TicketBooking = {
    bookingDate: '',
    transactionId: "ABC" + Math.floor(Math.random() * 1000000),
    transactionMode: '',
    totalCost: 0,
    status: 'pending',  // Set as pending initially
    attendeeId: parseInt(sessionStorage.getItem("id")),
    event: parseInt(sessionStorage.getItem("eventId"))
  };

  eventTitle: string;
  event: MyEvents;
  // noOfTickets: number = 1;  // Default at least 1 ticket

  // Payment state variables
  showPayment: boolean = false;
  showBooking: boolean = true;
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  transactionId: string = '';
  selectedPaymentType: string = ''; // Default to credit card

  // Form fields
  upiId: string = '';
  cardHolderName: string = '';
  cardNumber: string = '';
  expiration: string = '';
  cvv: string = '';

  str:string=''
  eventDetails:MyEvents;
  constructor(private service: AttendeeserviceService, private router: Router,private r: ActivatedRoute) { 
    this.str= this.r.snapshot.params['eventTitle'];

    this.service.getEventByTitle(this.str).subscribe({
      next: (res) => {
        this.event = res;
        this.eventDetails=res
         // Store the fetched event details in the event object
        console.log(this.event);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ngOnInit(): void {
  //   this.updateTotalCost();
  // }

  noOfTickets: number = 0;  // Default at least 1 ticket
  totalCost: number = 0;
  ticketPrice: number = 0;
  
  ngOnInit(): void {
    // this.ticketPrice = this.eventDetails?.eventPrice || 0;
    // this.updateTotalCost();
  }
  
  // // Update total cost dynamically
  // updateTotalCost(): void {
  //   this.totalCost = this.noOfTickets * this.ticketPrice;
  // }

  
  
  // Increment ticket count
  incrementTicket(): void {
    this.noOfTickets++;
    this.totalCost=this.eventDetails.eventPrice*this.noOfTickets
    console.log(this.totalCost)
  }
  
  // Decrement ticket count
  decrementTicket(): void {
    if (this.noOfTickets > 0) {
      this.noOfTickets--;
      this.totalCost=this.totalCost-this.eventDetails.eventPrice
    } else {
      alert("Minimum 1 Ticket Needed");
    }
  }



  buyTicket(): void {
    if (!this.b.bookingDate) {
      alert("Please select a booking date.");
      return;
    }
    
    this.b.transactionId = "TXN" + Math.floor(Math.random() * 1000000);
    this.b.status = "confirm"; // Mark as processing

    // Send ticket booking data to service
    // this.service.buyTicket(this.b).subscribe(response => {
    //   console.log(response);
    //   // alert("Booking successful!");
    //   this.showPayment = true;
    //   this.showBooking = false;
    // }, error => {
    //   console.error("Booking failed!", error);
    //   alert("Booking failed. Try again!");
    // });
  }

  pay(): void {
    this.showPayment = true;
    this.showBooking = false;
  }

  selectPaymentType(type: string): void {
    this.selectedPaymentType = type;
    this.b.transactionMode = type; // Update the transaction mode in object
  }

  processPayment(): void {
    if (this.selectedPaymentType === 'upi' && !this.upiId) {
      alert('Please enter your UPI ID.');
      return;
    } else if (this.selectedPaymentType !== 'upi' && (!this.cardHolderName || !this.cardNumber || !this.expiration || !this.cvv)) {
      alert('Please fill all card details.');
      return;
    }

    this.isProcessing = true;
    this.paymentSuccess = false;

    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
      this.showPayment = false;
      this.transactionId = "TXN" + Math.floor(Math.random() * 1000000000);

      // Update status after successful payment
      this.b.status = "Completed";

      this.service.buyTicket(this.b).subscribe(response => {
        console.log(response);
        // alert("Booking successful!");
        this.showPayment = true;
        this.showBooking = false;
      }, error => {
        console.error("Booking failed!", error);
        alert("Booking failed. Try again!");
      });
      alert("Payment Successful! Transaction ID: " + this.transactionId);
    }, 2000);
  }

  getEventsByAttendeeId(): void{
      
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






// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MyEvents } from 'src/app/model/MyEvents';
// import { TicketBooking } from 'src/app/model/TicketBooking';
// import { AttendeeserviceService } from 'src/app/services/attendeeservice.service';
 
// @Component({
//   selector: 'app-booking-form',
//   templateUrl: './booking-form.component.html',
//   styleUrls: ['./booking-form.component.css']
// })
// export class BookingFormComponent implements OnInit {
 
//   selectedEvent: MyEvents;
//   b: TicketBooking = {
//     bookingDate: '',
//     transactionId: "ABC" + Math.floor(Math.random() * 1000000),
//     transactionMode: 'UPI',
//     totalCost: 1000,
//     status: 'completed',
//     attendeeId: parseInt(sessionStorage.getItem("id")),
//     event: parseInt(sessionStorage.getItem("eventId"))
//   };
 
//   eventTitle: string;
//   event: MyEvents;
//   noOfTickets: number = 0;
 
//   // Payment state variables
//   showPayment: boolean = false;
//   showBooking: boolean = true;
//   isProcessing: boolean = false;
//   paymentSuccess: boolean = false;
//   transactionId: string = '';
//   selectedPaymentType: string = 'credit'; // Default to credit card
 
//   // Form fields
//   upiId: string = '';
//   cardHolderName: string = '';
//   cardNumber: string = '';
//   expiration: string = '';
//   cvv: string = '';
 
//   constructor(private service: AttendeeserviceService, private router: Router) { }
 
 
//   ngOnInit(): void {
//     this.b.totalCost = this.noOfTickets * 100; // Set initial cost
//   }
 
//   incrementTicket(): void {
//     this.noOfTickets++;
//     this.b.totalCost = this.noOfTickets * 100;
//   }
 
//   decrementTicket(): void {
//     if (this.noOfTickets > 1) {
//       this.noOfTickets--;
//       this.b.totalCost = this.noOfTickets * 100;
//     } else {
//       alert("Minimum 1 Ticket Needed");
//     }
//   }
 
 
 
//   buyTicket(): void {
//     if (this.b.event === 0) {
//       alert('Please select a valid event.');
//       return;
//     }
 
//     this.b.bookingDate = new Date().toISOString(); // Set current date
//     this.service.buyTicket(this.b).subscribe(res=>console.log(res))
//     // this.service.buyTicket(this.b).subscribe((booking) => {
//     //   this.b = booking;
//     //   this.showPayment = true;
//     //   this.showBooking = false;

//     //   console.log(this.b)
      
//     // });
//   }
 
//   backToHome(): void {
//     this.router.navigate(['/attendeedashboard']);
//   }
 
//   // Show Payment Page
//   pay(): void {
//     this.showPayment = true;
//     this.showBooking = false;
//   }
 
//   // Handle Payment Type Selection
//   selectPaymentType(type: string): void {
//     this.selectedPaymentType = type;
//   }
 
//   // Process Payment with Animation
//   processPayment(): void {
//     if (this.selectedPaymentType === 'upi' && !this.upiId) {
//       alert('Please enter your UPI ID.');
//       return;
//     } else if (this.selectedPaymentType !== 'upi' && (!this.cardHolderName || !this.cardNumber || !this.expiration || !this.cvv)) {
//       alert('Please fill all card details.');
//       return;
//     }
 
//     this.isProcessing = true;
//     this.paymentSuccess = false;
 
//     // Simulate a delay for payment processing (2 seconds)
//     setTimeout(() => {
//       this.isProcessing = false;
//       this.paymentSuccess = true;
//       this.showPayment=false;
//       this.transactionId = "TXN" + Math.floor(Math.random() * 1000000000);
//     }, 2000);
//   }

 

// }
 
 