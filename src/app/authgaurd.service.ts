import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate{

  constructor(private router: Router) { }
 
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const username: string | null = sessionStorage.getItem("email");
    const password: string | null = sessionStorage.getItem("password");
    const userRole: string | null = sessionStorage.getItem("role");
 
    const requiredRole = route.data['role'];

    
 
    if (username && password) {
      if (requiredRole && requiredRole !== userRole) {
        // If the role does not match, redirect to unauthorized access page
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    } else {
      // If the user is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
}
}
