package com.mphasis.eventify3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.eventify3.entity.Admin;

import com.mphasis.eventify3.repository.LoginRepository;

@Service
public class LoginService {
	
	@Autowired
	private LoginRepository loginRepo;
	
	
	public Admin loginAsAdmin(String email, String password) {
		
		System.out.println(email + " "+password);
		
		return loginRepo.findByAdminEmailAndPassword(email, password);
	}

//	public Attendee loginAsAttendee(String email, String password) {
//		
//		return loginRepo.findByAttendeeEmailAndPassword(email, password);
//	}
//	
//	
//	public Organizer loginAsOrganizer(String email, String password) {
//		
//		return loginRepo.findByOrganizerEmailAndPassword(email, password);
//	}
}
