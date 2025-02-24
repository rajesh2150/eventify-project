import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/Register';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,  // Inject RegisterService
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        confirmPassword: ['', Validators.required],
        contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role: ['', Validators.required]  // Role selection
      },
      { validators: this.passwordMatchValidator }  // Custom password match validator
    );
  }

  // Custom validator to check password match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  // Custom password strength validator
  passwordValidator(control: any) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (control.value && !passwordPattern.test(control.value)) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Getter methods to easily access form controls
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get contactNumber() { return this.registerForm.get('contactNumber'); }
  get role() { return this.registerForm.get('role'); }

  // On form submit
  onSubmit() {
    if (this.registerForm.valid) {
      // If role is 'attendee'
      if (this.registerForm.value.role === "attendee") {
        const formData = {
          attendeeName: this.registerForm.value.name,
          attendeeEmail: this.registerForm.value.email,
          attendeePassword: this.registerForm.value.password,
          attendeePhoneNumber: this.registerForm.value.contactNumber,
          attendeeIsSuspended: false, // Assuming attendee is not suspended by default
          role: 'attendee' // Static role as per backend
        };
  
        console.log('Form Data for Attendee before sending:', formData);
  
        this.registerService.registerAttendee(formData).subscribe(
          (response: any) => {
            console.log('Attendee Registered:', response);
            // this.router.navigate(['/attendeedashboard']);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Error during attendee registration:', error);
          }
        );
      }
  
      // If role is 'organizer'
      if (this.registerForm.value.role === "organizer") {
        const formData2 = {
          organizerName: this.registerForm.value.name,
          organizerEmail: this.registerForm.value.email,
          organizerPassword: this.registerForm.value.password,
          organizerPhoneNumber: this.registerForm.value.contactNumber,
          organizerIsSuspended: false, // Assuming organizer is not suspended by default
          role: this.registerForm.value.role // Dynamically set role
        };
  
        console.log('Form Data for Organizer before sending:', formData2);
  
        this.registerService.registerOrganizer(formData2).subscribe(
          (response: any) => {
            console.log('Organizer Registered:', response);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Error during organizer registration:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
}
