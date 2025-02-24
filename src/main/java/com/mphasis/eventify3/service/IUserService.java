package com.mphasis.eventify3.service;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Organizer;

public interface IUserService {
	public Attendee registerAttendee(Attendee attendee);
	public Organizer registerOrganizer(Organizer organizer);
	public String loginAttendee(String email, String pwd);
	public String loginOrganizer(String email, String pwd);
	
	
	
}
