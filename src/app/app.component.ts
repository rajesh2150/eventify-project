import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedRole: string = ''; 
  roleForRegistration: string = 'attendee'; 
 
  goToRegistration(role: string): void {
    if (role !== 'admin') { 
      this.roleForRegistration = role;
      this.selectedRole = 'register';  
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
}
