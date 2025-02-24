package com.mphasis.eventify3.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import ch.qos.logback.core.status.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TicketBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int bookingId;

    private LocalDateTime bookingDate;
    private String transactionId;
    private String transactionMode;
    private double totalCost;

//    @Enumerated(EnumType.STRING)
    
    private String status;
//   @JsonIgnore
//    @ManyToOne(optional = true)
//    @JoinColumn(name = "attendee_id")
//    private Attendee attendee;
    
    @JsonProperty("attendeeId")
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "attendee_id")
    private Attendee attendee;

 
    @Column(name = "event_id")
    private int event;

	public int getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public LocalDateTime getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getTransactionMode() {
		return transactionMode;
	}

	public void setTransactionMode(String transactionMode) {
		this.transactionMode = transactionMode;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Attendee getAttendee() {
		return attendee;
	}

	public void setAttendee(Attendee attendee) {
		this.attendee = attendee;
	}

	

	public int getEvent() {
		return event;
	}

	public void setEvent(int event) {
		this.event = event;
	}

	public TicketBooking() {
		super();
	}

	// Custom Setter for attendeeId
    @JsonProperty("attendeeId")
    public void setAttendeeId(int attendeeId) {
        if (this.attendee == null) {
            this.attendee = new Attendee();
        }
        this.attendee.setAttendeeId(attendeeId);  // Set the attendee from the attendeeId
    }
	@JsonProperty("attendeeId") // Exposes only the attendeeId field
    public int getAttendeeId() {
        return attendee != null ? attendee.getAttendeeId() : 0; // Safely return attendeeId
    }
    // Getters and Setters
    
}