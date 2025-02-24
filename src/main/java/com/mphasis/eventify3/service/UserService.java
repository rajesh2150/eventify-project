package com.mphasis.eventify3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.entity.User;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;
import com.mphasis.eventify3.repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private AttendeeRepository attendeeRepository;
	
	
	@Autowired
	private OrganizerRepository organizerRepository;
	
	public Attendee registerAttendee(Attendee attendee) {
		
		attendeeRepository.save(attendee);
		
		userRepo.saveAttendee(attendee.getAttendeeEmail(),attendee.getAttendeePassword(),attendee.getRole());
		
		return attendee;
	}
	
	public Organizer registerOrganizer(Organizer organizer) {
		organizerRepository.save(organizer);
		 userRepo.saveOrganizer(organizer.getOrganizerEmail(),organizer.getOrganizerPassword(),organizer.getRole());
		 
		 return organizer;
	}


	public String loginAttendee(String email, String pwd) {
		// TODO Auto-generated method stub
		return userRepo.loginAttendee(email,pwd);
	}
	
	public String loginOrganizer(String email, String pwd) {
		// TODO Auto-generated method stub
		
		return userRepo.loginOrganizer(email,pwd);
	}

	

}
