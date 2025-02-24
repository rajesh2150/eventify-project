import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private login:LoginService) {
    // Initialize the login form with validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required]] // Password field with validation
    });
  }

  // Getters for easy access to form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

// error msg

errorMessage:string='';

  // OnSubmit method to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Form Submitted:', { email, password });

      this.login.adminLogin(email,password)
      .subscribe(res=>{
        if(res){  
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("role", "admin");
          // admin/dashboard
          this.router.navigate(['/admin/dashboard']);
          }
          else{
            this.errorMessage="Invalid Credentials"
          }
    })


      // Redirect to Admin Dashboard upon successful login
      
    } else {
      console.log('Form is invalid');
    }
  }

}
