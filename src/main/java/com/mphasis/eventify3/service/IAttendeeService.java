package com.mphasis.eventify3.service;

import java.time.LocalDateTime;
import java.util.List;

import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Feedback;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.AttendeeExceptionHandler;

public interface IAttendeeService {
	public List<Event> getAllEventsByEventType(String type);
	public List<Event> getAllEventsByEventDate(LocalDateTime date);
	public List<Event> getAllEventsByEventLocation(String location);
	public Feedback giveFeedback(Feedback feedback) throws AttendeeExceptionHandler;
	public List<Event> getAllEvents();
	public TicketBooking bookTicket(TicketBooking ticketBooking);
	public int getAttendeeIdByEmail(String email);
	public List<Event> getAllEventsByAttendeeId(int aId);
	

}
