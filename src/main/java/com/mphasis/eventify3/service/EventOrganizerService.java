package com.mphasis.eventify3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.OrganizerRevenue;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;

@Service
public class EventOrganizerService {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private OrganizerRepository organizerRepository;

	public Event addEvent(Event event) throws EventOrganizerExceptionHandler {
		boolean isPresent = eventRepository.existsById(event.getEventId());

		

		if (!isPresent) {
			return eventRepository.save(event);
		} else {
			throw new EventOrganizerExceptionHandler("Event is Already There");
		}
	}

	public Event updateEvent(Event event) throws EventOrganizerExceptionHandler {

		boolean isPresent = eventRepository.existsById(event.getEventId());

		if (isPresent) {
			return eventRepository.save(event);
		} else {
			throw new EventOrganizerExceptionHandler("Event is Not Valid");
		}

	}

	public Optional<Event> deleteEvent(int id) throws EventOrganizerExceptionHandler {

		boolean isPresent = eventRepository.existsById(id);

		Optional<Event> event = eventRepository.findById(id);

		if (isPresent) {
			eventRepository.deleteById(id);

			return event;

		} else {
			throw new EventOrganizerExceptionHandler("Event is Not Valid To delete");
		}
	}

	public List<Attendee> getAllAttendeesByEventId(int eventId) {
		return organizerRepository.findAllByEventId(eventId);
	}

	public List<TicketBooking> getAllTicketBookingsByEventId(int id) throws EventOrganizerExceptionHandler {

		List<TicketBooking> bookingList = organizerRepository.findAllTicketBookingsByEventId(id);

		if (bookingList.isEmpty()) {

			throw new EventOrganizerExceptionHandler("Event Has No Bookings");
		}
		return bookingList;
	}

	public double showAllRevenueByEvent(int id) {
		return organizerRepository.showAllRevenueByEvent(id);
	}

	public Event getByEventTitle(String eventtitle) {
		Event e = eventRepository.findByEventTitle(eventtitle);
		return e;

	}

//	public int getOrganizerIdByEmail(String email) {
//
//		return organizerRepository.findOrganizerIdByEmail(email);
//	}
	
	
	public int getOrganizerIdByEmail(String email) {
	    Integer organizerId = organizerRepository.findOrganizerIdByEmail(email);

	    // If the organizerId is not found, return -1 or handle appropriately
	    return (organizerId != null) ? organizerId : -1;
	}


	public List<Attendee> getAllAttendeeByOrganizerId(int id) {
		return eventRepository.findAllAttendeeByOrganizerId(id);
	}

}
