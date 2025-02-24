import { Component } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent {

  showPayment: boolean = true;
  isProcessing = false;
  paymentSuccess = false;

  amount: number = 100;
  transactionId: number = Math.floor(Math.random() * 1000000); // Random transaction ID

  pay() {
    this.isProcessing = true;

    
    
    
    setTimeout(() => {
      this.showPayment = false;
      this.isProcessing = false;
      this.paymentSuccess = true;
    }, 2000); // Simulating payment processing delay
  }
}
