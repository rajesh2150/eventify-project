package com.mphasis.eventify3.entity;


import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore
    private int eventId;

    private String eventTitle;
    private String eventDescription;
    private LocalDateTime eventStartTime;
    private LocalDateTime eventEndTime;
    private String eventLocation;
    private double eventPrice;
    private String eventType;
    private int totalTickets;
    private double totalReceivedAmount;
    private double payToPlatform;
    


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "organizer_id")
    @JsonProperty("organizerId")
    private Organizer organizer;
    


    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<TicketBooking> ticketBookings;

    @OneToMany
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<Ticket> tickets;

	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public String getEventDescription() {
		return eventDescription;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public LocalDateTime getEventStartTime() {
		return eventStartTime;
	}

	public void setEventStartTime(LocalDateTime eventStartTime) {
		this.eventStartTime = eventStartTime;
	}

	public LocalDateTime getEventEndTime() {
		return eventEndTime;
	}

	public void setEventEndTime(LocalDateTime eventEndTime) {
		this.eventEndTime = eventEndTime;
	}

	public String getEventLocation() {
		return eventLocation;
	}

	public void setEventLocation(String eventLocation) {
		this.eventLocation = eventLocation;
	}

	public double getEventPrice() {
		return eventPrice;
	}

	public void setEventPrice(double eventPrice) {
		this.eventPrice = eventPrice;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public int getTotalTickets() {
		return totalTickets;
	}

	public void setTotalTickets(int totalTickets) {
		this.totalTickets = totalTickets;
	}

	public double getTotalReceivedAmount() {
		return totalReceivedAmount;
	}

	public void setTotalReceivedAmount(double totalReceivedAmount) {
		this.totalReceivedAmount = totalReceivedAmount;
	}

	public double getPayToPlatform() {
		return payToPlatform;
	}

	public void setPayToPlatform(double payToPlatform) {
		this.payToPlatform = payToPlatform;
	}


	public Organizer getOrganizer() {
		return organizer;
	}

	public void setOrganizer(Organizer organizer) {
		this.organizer = organizer;
	}

	public List<TicketBooking> getTicketBookings() {
		return ticketBookings;
	}

	public void setTicketBookings(List<TicketBooking> ticketBookings) {
		this.ticketBookings = ticketBookings;
	}

	public List<Feedback> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(List<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}
	
	@JsonProperty("organizerId")
    public void setOrganizerId(int organizerId) {
        if (this.organizer == null) {
            this.organizer = new Organizer();
        }
        this.organizer.setOrganizerId(organizerId);  // Set the attendee from the attendeeId
    }
	@JsonProperty("organizerId") // Exposes only the attendeeId field
    public int getOrganizerId() {
        return organizer != null ? organizer.getOrganizerId() : 0; // Safely return attendeeId
    }

	
    
}