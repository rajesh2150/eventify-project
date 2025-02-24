import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
// import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit{

  toastMessage:string;
  private toastSubscription:Subscription;

  constructor(private toastService:NotificationService,private cdr: ChangeDetectorRef){}
  
  
  ngOnInit(): void {
    this.toastSubscription=this.toastService.message$.subscribe((message)=>{
      console.log('Received message' , message);
      this.toastMessage=message || "";
      console.log('Current toastMessage:', this.toastMessage);
      //this.cdr.detectChanges();
    });
  }

}
