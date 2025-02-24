package com.mphasis.eventify3.entity;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int adminId;

    private String adminMail;
    private String adminPassword;

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private List<AdminRevenue> adminRevenues;

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getAdminMail() {
		return adminMail;
	}

	public void setAdminMail(String adminMail) {
		this.adminMail = adminMail;
	}

	public String getAdminPassword() {
		return adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public List<AdminRevenue> getAdminRevenues() {
		return adminRevenues;
	}

	public void setAdminRevenues(List<AdminRevenue> adminRevenues) {
		this.adminRevenues = adminRevenues;
	}

	public Admin() {
		super();
	}

    // Getters and Setters
    
    
}
