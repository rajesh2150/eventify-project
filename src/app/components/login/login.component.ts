import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(private fb: FormBuilder, private router: Router, private login: LoginService) {
    // Initialize the login form with validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['attendee', Validators.required]  // New field for role selection
    });
  }
 
  // Getters for easy access to form controls
  get email() {
    return this.loginForm.get('email');
  }
 
  get password() {
    return this.loginForm.get('password');
  }
 
  get role() {
    return this.loginForm.get('role');
  }
 
  userRole: string = "User is";
 
  erroMessage:string="";
 
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const role = this.loginForm.get('role')?.value; // Get the role from the form
 
      if (role === 'attendee') {
        this.login.login(email, password).subscribe(
          res => {
            this.userRole = res.role;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("role", res.role); // Store the role in sessionStorage
           
            res.role === "attendee" ? this.router.navigate(['/attendeedashboard']) : this.erroMessage = "Entered Invalid Credentials";
          },
          err => console.error('HTTP Error', err)
        );
      } else if (role === 'organizer') {
        this.login.organizerLogin(email, password).subscribe(
          res => {
            this.userRole = res.role;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("role", res.role); // Store the role in sessionStorage
           
            res.role === "organizer" ? this.router.navigate(['/organizerdashboard']) : this.erroMessage = "Entered Invalid Credentials";
          },
          err => console.error('HTTP Error', err)
        );
      }
    }
    else {
      console.log('Form is invalid');
    }
  }
 
}











// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from 'src/app/services/login.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router, private login: LoginService) {
//     // Initialize the login form with validations
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//       role: ['attendee', Validators.required]  // New field for role selection
//     });
//   }

//   // Getters for easy access to form controls
//   get email() {
//     return this.loginForm.get('email');
//   }

//   get password() {
//     return this.loginForm.get('password');
//   }

//   get role() {
//     return this.loginForm.get('role');
//   }

//   userRole: string = "User is";

//   erroMessage:string="";

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const email = this.loginForm.get('email')?.value;
//       const password = this.loginForm.get('password')?.value;
//       const role = this.loginForm.get('role')?.value; // Get the role from the form

//       // Redirect based on the selected role
//       if (role === 'attendee') {
//         this.login.login(email, password).subscribe(
//           res => {
//             console.log(res);
//             this.userRole = res.role;
//             res.role=="attendee" ?
//            ( sessionStorage.setItem("email",email) ,this.router.navigate(['/attendeedashboard']) ) : this.erroMessage="Entered Invalid Credentials";
            
//             // // empty input values
//             // this.loginForm.setValue({['email']:""});
//             // this.loginForm.setValue({['password']:""});

//             // localStorage.setItem("email", "email")



//           },
//           err => console.error('HTTP Error', err)
//         );
//       } else if (role === 'organizer') {
//         this.login.organizerLogin(email, password).subscribe(
//           res => {
//             console.log(res);
//             this.userRole = res.role;

//             res.role =="organizer" ?
            
//             (sessionStorage.setItem("email",email),this.router.navigate(['/organizerdashboard'])) : this.erroMessage="Entered Invalid Credentials"; // Navigate to OrganizerComponent
//           },
//           err => console.error('HTTP Error', err)
//         );
//       }
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }
