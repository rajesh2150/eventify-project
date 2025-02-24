package com.mphasis.eventify3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrganizerRevenue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int revenueId;

    private double revenue;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private Organizer organizer;

	public int getRevenueId() {
		return revenueId;
	}

	public void setRevenueId(int revenueId) {
		this.revenueId = revenueId;
	}

	public double getRevenue() {
		return revenue;
	}

	public void setRevenue(double revenue) {
		this.revenue = revenue;
	}

	public Organizer getOrganizer() {
		return organizer;
	}

	public void setOrganizer(Organizer organizer) {
		this.organizer = organizer;
	}

	public OrganizerRevenue() {
		super();
	}

    // Getters and Setters
    
    
}