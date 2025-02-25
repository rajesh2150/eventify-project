package com.mphasis.eventify3.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping("/eventify/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

//    @GetMapping("/getallattendees")
//    public List<Object[]> getAllAttendeesUsers(){
//    	return adminService.getAllAttendeeUsers();
//    }

	@GetMapping("/getallattendees")
	public ResponseEntity<List<Object[]>> getAllAttendeesUsers() {
		try {
			List<Object[]> attendees = adminService.getAllAttendeeUsers();
			if (attendees.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
			}
			return new ResponseEntity<>(attendees, HttpStatus.OK); // 200 OK
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
		}
	}

	// Get all organizers
	@GetMapping("/getallorganizers")
	public ResponseEntity<List<Object[]>> getAllOrganizersUsers() {
		try {
			List<Object[]> organizers = adminService.getAllOrganizerUsers();
			if (organizers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
			}
			return new ResponseEntity<>(organizers, HttpStatus.OK); // 200 OK
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
		}
	}

	// Update event
	@PutMapping("/updateevent")
	public ResponseEntity<?> updateEvent(@RequestBody Event event) {
		try {
			Event updatedEvent = adminService.updateEvent(event);
			if (updatedEvent != null) {
				return new ResponseEntity<>(updatedEvent, HttpStatus.OK); // 200 OK
			} else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	// Suspend/Activate organizer
	@PostMapping("/organizer/{organizerid}/suspend")
	public ResponseEntity<?> suspendOrganizer(@PathVariable int organizerid, @RequestParam boolean suspend) {
		try {
			boolean isUpdated = adminService.manageOrganizerAccount(organizerid, suspend);
			if (isUpdated) {
				return new ResponseEntity<>(HttpStatus.OK); // 204 No Content (action taken successfully)
			} else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 404 Not Found
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 500 Internal Server Error
		}
	}

	// Suspend/Activate attendee
	@PostMapping("/attendee/{attendeeid}/suspend")
	public ResponseEntity<?> suspendUser(@PathVariable int attendeeid, @RequestParam boolean suspend) {
		try {
			boolean isUpdated = adminService.manageUserAccount(attendeeid, suspend);
			if (isUpdated) {
				return new ResponseEntity<>(HttpStatus.OK); // 204 No Content (action taken successfully)
			} else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 404 Not Found
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 500 Internal Server Error
		}
	}

	// Get all events
	@GetMapping("/events")
	public ResponseEntity<List<Event>> getAllEvents() {
		try {
			List<Event> events = adminService.getAllEvents();
			if (events.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
			}
			return new ResponseEntity<>(events, HttpStatus.OK); // 200 OK

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
		}
	}

	// Get platform analytics
	@GetMapping("/analytics")
	public ResponseEntity<Map<String, Object>> getPlatformAnalytics() {
		try {
			Map<String, Object> analytics = adminService.getPlatformAnalytics();
			if (analytics != null && !analytics.isEmpty()) {
				return new ResponseEntity<>(analytics, HttpStatus.OK); // 200 OK
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
		}
	}

	@GetMapping("/login/{email}/{password}")
	public boolean adminLogin(@PathVariable String email, @PathVariable String password) {

		Admin isAdmin = adminService.loginAdmin(email, password);
		
		System.out.println(email+" "+password);

		if (isAdmin != null) {
			return true;
		}

		else {
			return false;
		}
	}
	
	@GetMapping("/eventsByOrganizerId/{id}")
    public ResponseEntity<?> getEventsByOrganizerId(@PathVariable("id") int oId ){
    	try {
    		List<Event> events=adminService.getAllEventsByOrganizerId(oId);
    		if(events.isEmpty()) {
    			return new ResponseEntity<String>("No events for this Organizer",HttpStatus.NO_CONTENT); // 204 No Content
    		}
    		else {
    			return new ResponseEntity<List<Event>> (events,HttpStatus.ACCEPTED);
    		}
    	}catch (Exception e){
    		 return new ResponseEntity<String>("Exception occured",HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
	
	  @GetMapping("/eventsByAttendeeId/{id}")
	    public ResponseEntity<?> getEventsByAttendeeId(@PathVariable("id") int aId ){
	    	try {
	    		List<Event> events=adminService.getAllEventsByOrganizerId(aId);
	    		if(events.isEmpty()) {
	    			return new ResponseEntity<String>("No events for this Organizer",HttpStatus.NO_CONTENT); // 204 No Content
	    		}
	    		else {
	    			return new ResponseEntity<List<Event>> (events,HttpStatus.ACCEPTED);
	    		}
	    	}catch (Exception e){
	    		 return new ResponseEntity<String>("Exception occured",HttpStatus.INTERNAL_SERVER_ERROR);
	    	}
	    }

}
