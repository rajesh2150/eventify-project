package com.mphasis.eventify3.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;
import com.mphasis.eventify3.repository.AdminRepository;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;
    
    @Autowired
    private OrganizerRepository organizerRepository;

    @Autowired
    private EventRepository eventRepository;
    
    
    
    public List<Object[]> getAllAttendeeUsers(){
    	return attendeeRepository.findAllAttendee();
    	
    }
    
    public List<Object[]> getAllOrganizerUsers(){
    	return organizerRepository.findAllOrganizer();
    	
    }
    
    
    public Event updateEvent(Event event) throws EventOrganizerExceptionHandler {
    	
    	boolean isPresent = eventRepository.existsById(event.getEventId());
    	
    	if(isPresent) {
    		return eventRepository.save(event);
    	}
    	else {    		
    		 throw new EventOrganizerExceptionHandler("Event Id is Not Valid ");
    	}
    	
    }
    
    
 

    // Manage user accounts (activation/suspension)
    public boolean manageUserAccount(int attendeeId, boolean suspend) {
        Optional<Attendee> attendee = attendeeRepository.findById(attendeeId);
        if (attendee.isPresent()) {
            attendee.get().setAttendeeIsSuspended(suspend);
            attendeeRepository.save(attendee.get());
            
            return true;
        } else {
            throw new RuntimeException("Attendee not found");
        }
    }
    
    public boolean manageOrganizerAccount(int organizerId, boolean suspend) {
        Optional<Organizer> organizer = organizerRepository.findById(organizerId);
        if (organizer.isPresent()) {
        	organizer.get().setOrganizerIsSuspended(suspend);
        	organizerRepository.save(organizer.get());
        	
        	return true;
        } else {
            throw new RuntimeException("Organizer not found");
        }
    }

    // Monitor events and handle disputes
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    
    
    

    // Platform Analytics (total revenue, events, users)
    public Map<String, Object> getPlatformAnalytics() {
        List<Event> events = eventRepository.findAll();
        double totalRevenue = events.stream().mapToDouble(Event::getTotalReceivedAmount).sum();
        long totalEvents = events.size();
        long totalUsers = attendeeRepository.count();

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalRevenue", totalRevenue);
        analytics.put("totalEvents", totalEvents);
        analytics.put("totalUsers", totalUsers);
        return analytics;
    }
    
    
    public Admin loginAdmin(String name, String password) {
    	
    	return adminRepository.findByAdminMailAndAdminPassword(name, password);
    }
    
    public List<Event> getAllEventsByOrganizerId(int oId){
    	List<Event> events = eventRepository.findAllEventsByOrganizerId(oId);
    	return events;
    }
    
    public List<Event> getAllEventsByAttendeeId(int aId){
    	List<Event> events = eventRepository.findAllEventsByAttendeeId(aId);
    	return events;
    }
    
    
    
    
    
}
