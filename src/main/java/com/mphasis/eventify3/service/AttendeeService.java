package com.mphasis.eventify3.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Feedback;
import com.mphasis.eventify3.entity.Ticket;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.AttendeeExceptionHandler;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.FeedbackRepository;
import com.mphasis.eventify3.repository.TicketBookingRepository;

@Service
public class AttendeeService {

	@Autowired
	private AttendeeRepository attendeeRepo;

	@Autowired
	private TicketBookingRepository ticketBookingRepo;

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Autowired
	private EventRepository eventRepository;

	public List<Event> getAllEventsByEventType(String type) {
		return attendeeRepo.findAllEventByEventType(type);
	}

	public List<Event> getAllEventsByEventDate(LocalDateTime date) {
		return attendeeRepo.findAllEventByEventDate(date);
	}

	public List<Event> getAllEventsByEventLocation(String location) {
		return attendeeRepo.findAllEventByEventLocation(location);
	}

//	public TicketBooking bookTicket(TicketBooking ticketBooking) {
//		return ticketBookingRepo.save(ticketBooking);
//	}

	public Feedback giveFeedback(Feedback feedback) throws AttendeeExceptionHandler {

		boolean isPresent = feedbackRepository.existsById(feedback.getFeedbackId());

		boolean isEvent = eventRepository.existsById(feedback.getEventId());

		boolean isAttendee = attendeeRepo.existsById(feedback.getAttendeeId());

		if (!isPresent && isEvent && isAttendee) {
			return feedbackRepository.save(feedback);
		}

		if (!isEvent) {
			throw new AttendeeExceptionHandler("Event is Not Found");
		}
		if (!isPresent) {
			throw new AttendeeExceptionHandler("Already Feedback Given");
		}
		if (!isAttendee) {
			throw new AttendeeExceptionHandler("Attendee is Not Found");
		}

		else {
			throw new AttendeeExceptionHandler("Not Valid Details");
		}

	}

	public List<Event> getAllEvents(){
		List<Event> eList = eventRepository.findAll();
		return eList;
	}
	
	
	
	public TicketBooking bookTicket(TicketBooking ticketBooking) {
	    // Step 1: Fetch the Attendee entity by its ID (attendeeId)
	    Attendee attendee = attendeeRepo.findById(ticketBooking.getAttendeeId())
	                                          .orElseThrow(() -> new RuntimeException("Attendee not found"));
 
	    // Step 2: Set the managed Attendee object to the ticketBooking
	    ticketBooking.setAttendee(attendee);
 
	    // Step 3: Save and return the TicketBooking entity
	    return ticketBookingRepo.save(ticketBooking);
	}
	
//	public int getAttendeeIdByEmail(String email) {
//		
//		return attendeeRepo.findAttendeeIdByEmail(email);
//	}
	
	public int getAttendeeIdByEmail(String email) {
	    Integer id = attendeeRepo.findAttendeeIdByEmail(email);
	    if (id == null) {
	        return -1;  // Return -1 if no attendee is found
	    }
	    return id;
	}

	
	
	public List<Event> getAllEventsByAttendeeId(int aId){
    	List<Event> events = eventRepository.findAllEventsByAttendeeId(aId);
    	return events;
    }

	public boolean getAttendeeIsSuspendedById(int id) {
		// TODO Auto-generated method stub
		return attendeeRepo.findAttendeeIsSuspendedById(id);
	}
}
