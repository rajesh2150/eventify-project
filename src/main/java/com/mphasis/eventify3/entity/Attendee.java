package com.mphasis.eventify3.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int attendeeId;

    private String attendeeName;
    
    @Column(unique = true)
    private String attendeeEmail;
    private String attendeePassword;
    private String attendeePhoneNumber;
    private boolean attendeeIsSuspended=false;
    private final String role = "attendee";

    @OneToMany(mappedBy = "attendee")
    @JsonIgnore
    private List<TicketBooking> ticketBookings;
   
//    @OneToMany(cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Feedback> feedbacks;

	public int getAttendeeId() {
		return attendeeId;
	}

	public void setAttendeeId(int attendeeId) {
		this.attendeeId = attendeeId;
	}

	public String getAttendeeName() {
		return attendeeName;
	}

	public void setAttendeeName(String attendeeName) {
		this.attendeeName = attendeeName;
	}

	public String getAttendeeEmail() {
		return attendeeEmail;
	}

	public void setAttendeeEmail(String attendeeEmail) {
		this.attendeeEmail = attendeeEmail;
	}

	public String getAttendeePassword() {
		return attendeePassword;
	}

	public void setAttendeePassword(String attendeePassword) {
		this.attendeePassword = attendeePassword;
	}

	public String getAttendeePhoneNumber() {
		return attendeePhoneNumber;
	}

	public void setAttendeePhoneNumber(String attendeePhoneNumber) {
		this.attendeePhoneNumber = attendeePhoneNumber;
	}

	public boolean isAttendeeIsSuspended() {
		return attendeeIsSuspended;
	}

	public void setAttendeeIsSuspended(boolean attendeeIsSuspended) {
		this.attendeeIsSuspended = attendeeIsSuspended;
	}

	public String getRole() {
		return role;
	}

//	public void setRole(String role) {
//		this.role = role;
//	}

	public List<TicketBooking> getTicketBookings() {
		return ticketBookings;
	}

	public void setTicketBookings(List<TicketBooking> ticketBookings) {
		this.ticketBookings = ticketBookings;
	}

	

	public Attendee() {
		super();
	}

//	public Attendee(String attendeeName, String attendeeEmail, String attendeePhoneNumber) {
//		super();
//		this.attendeeName = attendeeName;
//		this.attendeeEmail = attendeeEmail;
//		this.attendeePhoneNumber = attendeePhoneNumber;
//	}
//  
    
    
    
}