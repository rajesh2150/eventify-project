export class Register {
    public attendeeName: string;
    public attendeeEmail: string;
    public attendeePassword: string;
    public attendeePhoneNumber: string;
    public attendeeIsSuspended: boolean; // Make sure this is correctly set if needed
    public role: string;
  
    constructor(
      name: string,
      email: string,
      password: string,
      phoneNumber: string,
      isSuspended: boolean,
      role: string
    ) {
      this.attendeeName = name;
      this.attendeeEmail = email;
      this.attendeePassword = password;
      this.attendeePhoneNumber = phoneNumber;
      this.attendeeIsSuspended = isSuspended;
      this.role = role;
    }
  }
  