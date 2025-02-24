package com.mphasis.eventify3.service;

import java.util.List;
import java.util.Optional;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;

public interface IEventOrganizerService {
	public Event addEvent(Event event) throws EventOrganizerExceptionHandler;
	public Event updateEvent(Event event) throws EventOrganizerExceptionHandler;
	public Optional<Event> deleteEvent(int id) throws EventOrganizerExceptionHandler;
	public List<Attendee> getAllAttendeesByEventId(int eventId);
	public List<TicketBooking> getAllTicketBookingsByEventId(int id) throws EventOrganizerExceptionHandler;
	public double showAllRevenueByEvent(int id);
	public Event getByEventTitle(String eventtitle);
	public int getOrganizerIdByEmail(String email);
	public List<Attendee> getAllAttendeeByOrganizerId(int id);

}
