package com.mphasis.eventify3.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Feedback;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.service.AttendeeService;

//import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/attendee")
@CrossOrigin("*")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;
    
  
    @GetMapping("/getalleventsbytype/{type}")
    public ResponseEntity<List<Event>> getAllEventsByEventType(@PathVariable String type) {
        try {
            List<Event> events = attendeeService.getAllEventsByEventType(type);
            if (events.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
            }
            return new ResponseEntity<>(events, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
    
    
    

    
    @GetMapping("/getalleventsbydate/{date}") // we need to pass as 2025-02-19 10:05:49.005000
    public ResponseEntity<List<Event>> getAllEventsByEventDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        try {
            List<Event> events = attendeeService.getAllEventsByEventDate(date);
            if (events.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
            }
            return new ResponseEntity<>(events, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
    
    
    
    @GetMapping("/getalleventsbylocation/{location}")
    public ResponseEntity<List<Event>> getAllEventsByEventLocation(@PathVariable String location) {
        try {
            List<Event> events = attendeeService.getAllEventsByEventLocation(location);
            if (events.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
            }
            return new ResponseEntity<>(events, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    
    

    
    
    @PostMapping("/buyticket")
    public ResponseEntity<?> buyTicket(@RequestBody TicketBooking ticketBooking) {
        try {
            TicketBooking bookedTicket = attendeeService.bookTicket(ticketBooking);
            if (bookedTicket != null) {
                return new ResponseEntity<>(bookedTicket, HttpStatus.CREATED); // 201 Created
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST); 
        }
    }
    
 
    
    @PostMapping("/givefeedback")
    public ResponseEntity<?> giveFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback submittedFeedback = attendeeService.giveFeedback(feedback);
            if (submittedFeedback != null) {
                return new ResponseEntity<>(submittedFeedback, HttpStatus.CREATED); // 201 Created
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 400 Bad Request if feedback submission fails
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST); // 500 Internal Server Error
        }
    }
    
    
    @GetMapping("/getallevents")
    public ResponseEntity<?> getAllEvents(){
    	List<Event> eList = attendeeService.getAllEvents();
    	if(!eList.isEmpty())
    		return new ResponseEntity<List<Event>>(eList,HttpStatus.OK);
    	else
    	return new ResponseEntity<String>("Sorry no events found",HttpStatus.NOT_FOUND);
    }
 
    
//    @GetMapping("/{email}")
//    public Map<String,Integer> getAttendeeIdByEmail(@PathVariable String email) {
//    	int id= attendeeService.getAttendeeIdByEmail(email);
//    	HashMap<String, Integer> respose=new HashMap<>();
//    	respose.put("id", id);
//    	
//    	System.out.println(respose);
//    	return respose;
//    }
    
    @GetMapping("/{email}")
    public ResponseEntity<?> getAttendeeIdByEmail(@PathVariable String email) {
        int id = attendeeService.getAttendeeIdByEmail(email);

        if (id != -1) {
            // Return the ID with a 200 OK status
            Map<String, Integer> response = new HashMap<>();
            response.put("id", id);
            return new ResponseEntity<Map<String, Integer>>(response, HttpStatus.OK);
        } else {
            // Return a message with a 404 Not Found status if the ID is not found
            return new ResponseEntity<String>("Attendee not found", HttpStatus.NOT_FOUND);
        }
    }


	
//   @GetMapping("/getalleventsbyattendeeId/{attendeeid}")
//   public List<Event> getAllEventsByAttendeeId(@PathVariable("attendeeid") int aId){
//	   return attendeeService.getAllEventsByAttendeeId(aId);
//   }
    
    @GetMapping("/getalleventsbyattendeeId/{attendeeid}")
    public ResponseEntity<?> getAllEventsByAttendeeId(@PathVariable("attendeeid") int aId) {
        List<Event> events = attendeeService.getAllEventsByAttendeeId(aId);

        if (!events.isEmpty()) {
            // Return the events with a 200 OK status
            return new ResponseEntity<List<Event>>(events, HttpStatus.OK);
        } else {
            // Return a message with a 404 Not Found status if no events are found
            return new ResponseEntity<String>("No events found for this attendee.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getattendeeissuspendedbyid/{id}")
   public ResponseEntity<?> getAttendeeIsSuspendedById(@PathVariable int id){
	   
	   boolean isSuspended = attendeeService.getAttendeeIsSuspendedById(id);
	   
	   if(isSuspended) {
		   return new ResponseEntity<>(true,HttpStatus.OK);
	   }
	   else {
		   return new ResponseEntity<>(false,HttpStatus.NOT_FOUND);
	   }
   }
    

}
