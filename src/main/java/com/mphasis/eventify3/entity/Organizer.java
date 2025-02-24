package com.mphasis.eventify3.entity;

import java.util.List;

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
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore
    private int organizerId;

    private String organizerName;
    
    @Column(unique = true)
    private String organizerEmail;
    private String organizerPassword;
    private String organizerPhoneNumber;
    private boolean organizerIsSuspended = false;
    private String role = "organizer";
    
    @OneToMany(mappedBy = "organizer",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Event> events;

    @OneToMany(mappedBy = "organizer")
    @JsonIgnore
    private List<OrganizerRevenue> organizerRevenues;

	public int getOrganizerId() {
		return organizerId;
	}

	public void setOrganizerId(int organizerId) {
		this.organizerId = organizerId;
	}

	public String getOrganizerName() {
		return organizerName;
	}

	public void setOrganizerName(String organizerName) {
		this.organizerName = organizerName;
	}

	public String getOrganizerEmail() {
		return organizerEmail;
	}

	public void setOrganizerEmail(String organizerEmail) {
		this.organizerEmail = organizerEmail;
	}

	public String getOrganizerPassword() {
		return organizerPassword;
	}

	public void setOrganizerPassword(String organizerPassword) {
		this.organizerPassword = organizerPassword;
	}

	public String getOrganizerPhoneNumber() {
		return organizerPhoneNumber;
	}

	public void setOrganizerPhoneNumber(String organizerPhoneNumber) {
		this.organizerPhoneNumber = organizerPhoneNumber;
	}

	public boolean isOrganizerIsSuspended() {
		return organizerIsSuspended;
	}

	public void setOrganizerIsSuspended(boolean organizerIsSuspended) {
		this.organizerIsSuspended = organizerIsSuspended;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public List<OrganizerRevenue> getOrganizerRevenues() {
		return organizerRevenues;
	}

	public void setOrganizerRevenues(List<OrganizerRevenue> organizerRevenues) {
		this.organizerRevenues = organizerRevenues;
	}

	public Organizer() {
		super();
	}

    // Getters and Setters
    
    
}