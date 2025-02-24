import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unathorized',
  templateUrl: './unathorized.component.html',
  styleUrls: ['./unathorized.component.css']
})
export class UnathorizedComponent {

  constructor(private router:Router){}

  backToHome():void{
    this.router.navigate(['/dashboard'])
  }

}
