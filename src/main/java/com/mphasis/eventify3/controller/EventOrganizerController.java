package com.mphasis.eventify3.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
//import java.net.http.HttpHeaders;
import org.springframework.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;
import com.mphasis.eventify3.repository.AdminRepository;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.service.AdminService;
import com.mphasis.eventify3.service.EventOrganizerService;

@RestController
@RequestMapping("/eventify/organizer")
@CrossOrigin("*")
public class EventOrganizerController {
	
	
	

	@Autowired
	private EventOrganizerService es;
	
	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private AdminService adminService;

	

	 @GetMapping("/getallattendeesbyeventid/{id}")
	    public ResponseEntity<?> getAllAttendeesByEventId(@PathVariable int id) {
	        List<Attendee> attendees = es.getAllAttendeesByEventId(id);
	        if (attendees.isEmpty()) {
	            return new ResponseEntity<>("No Attendees for This Event",HttpStatus.NO_CONTENT); // 204 No Content
	        }
	        return new ResponseEntity<>(attendees, HttpStatus.OK); // 200 OK
	    }
	
	

	 @PostMapping("/addevent")
	    public ResponseEntity<Event> addEvent(@RequestBody Event event) throws EventOrganizerExceptionHandler {
	        Event createdEvent = es.addEvent(event);
	       
	        	
	        if(createdEvent !=null) {	        	
	        	return new ResponseEntity<>(createdEvent, HttpStatus.CREATED); // 201 Created
	        }
	        else {
	        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }	        
	           
	    }
	
//	@PutMapping("/updateevent")
//	public Event updateEvent(@RequestBody Event event) {
//		return es.updateEvent(event);
//	}
//	
	 
	 
	 @PutMapping("/updateevent")
	    public ResponseEntity<?> updateEvent(@RequestBody Event event) throws EventOrganizerExceptionHandler {
	        
	        try {
	        	Event updatedEvent = es.updateEvent(event);
	        	 if (updatedEvent == null) {
	 	            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
	 	        }
	 	        else {	        	
	 	        	return new ResponseEntity<>(updatedEvent, HttpStatus.OK); // 200 OK
	 	        }
	        }catch(Exception e) {
	        	return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
	        }
	       
	    }
	

	
	
	 

	    @DeleteMapping("/deleteevent/{id}")
	    public ResponseEntity<?> deleteEvent(@PathVariable int id) throws EventOrganizerExceptionHandler {
	    	
	    	try {
	    		Optional<Event> event = es.deleteEvent(id);
		        if (!event.isPresent()) {
		            return new ResponseEntity<>(event,HttpStatus.OK); // 200 OK
		        }
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
	    		
	    	}catch(Exception e) {
	    		throw new EventOrganizerExceptionHandler("Not a Valid Event To delete");
	    	}
	        
	    }
	
	
	    @GetMapping("/getallticketbookingsbyeventid/{id}")
	    public ResponseEntity<List<TicketBooking>> getAllTicketBookingsByEventId(@PathVariable int id) throws EventOrganizerExceptionHandler {
	       
	        List<TicketBooking> ticketBookings = es.getAllTicketBookingsByEventId(id);
	        
	       
	        if (ticketBookings.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
	        }
	        
	 
	        return new ResponseEntity<>(ticketBookings, HttpStatus.OK); // 200 OK
	    }

	    

//	@GetMapping("/event/{eventTitle}/image")
//	public ResponseEntity<byte[]> getEventImage(@PathVariable String eventTitle) {
//	    Event event = eventRepository.findByEventTitle(eventTitle);
//
//	    if (event == null || event.getImageData() == null) {
//	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//	    }
//
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.setContentType(MediaType.IMAGE_JPEG);
//	    headers.setContentLength(event.getImageData().length);
//
//	    return new ResponseEntity<>(event.getImageData(), headers, HttpStatus.OK);
//	}

	
//	@GetMapping("/{email}")
//    public Map<String,Integer> getOrganizerIdByEmail(@PathVariable String email) {
//    	int id= es.getOrganizerIdByEmail(email);
//    	HashMap<String, Integer> respose=new HashMap<>();
//    	respose.put("id", id);
//    	
//    	System.out.println(respose);
//    	return respose;
//    }
	    
	    @GetMapping("/{email}")
	    public ResponseEntity<?> getOrganizerIdByEmail(@PathVariable String email) {
	        int id = es.getOrganizerIdByEmail(email);
	        
	        if (id != -1) {
	            // If the ID is valid, return the response with HTTP 200 OK status
	            Map<String, Integer> response = new HashMap<>();
	            response.put("id", id);
	            return new ResponseEntity<>(response, HttpStatus.OK);
	        } else {
	            // If the ID is not found, return a message with HTTP 404 Not Found status
	            Map<String, String> errorResponse = new HashMap<>();
	            errorResponse.put("message", "Organizer not found for email: " + email);
	            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	        }
	    }

	    
	    
	    
	    
	
//	@PostMapping("/upload")
//	public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
//	    try {
//	        // Compress the image
//	        BufferedImage originalImage = ImageIO.read(file.getInputStream());
//	        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//	        ImageIO.write(originalImage, "jpg", byteArrayOutputStream);
//	        
//	        byte[] compressedImageData = byteArrayOutputStream.toByteArray();
//	        
//	        // Save the compressed image data to the database
//	        Event event = new Event();
//	        event.setEventId(1); // Example random ID
//	        event.setEventTitle("Tech Conference 2025");
//	        event.setEventDescription("A conference showcasing the latest advancements in technology.");
//	        event.setEventStartTime(LocalDateTime.of(2025, 3, 15, 9, 0));
//	        event.setEventEndTime(LocalDateTime.of(2025, 3, 15, 17, 0));
//	        event.setEventLocation("Pune, Maharashtra");
//	        event.setEventPrice(199.99);
//	        event.setEventType("Conference");
//	        event.setTotalTickets(300);
//	        event.setTotalReceivedAmount(50000.00);
//	        event.setPayToPlatform(5000.00);
//	        event.setImageData(compressedImageData);
//
//	        Organizer organizer = new Organizer(); // You need to initialize this based on your Organizer class
//	        organizer.setOrganizerId(1); // Example random organizer ID
////	        organizer.setName("John Doe");
//	        event.setOrganizer(organizer);
//	        
//	        eventRepository.save(event);		
//	        
//	        System.out.println(file.getContentType());
//	        
//	        return ResponseEntity.ok("Image uploaded successfully with ID: " );
//	    } catch (IOException e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
//	    }
//	}
	
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
	
	
//	@GetMapping("/showeventrevenue/{id}")
//	public double showAllRevenueByEvent(@PathVariable("id") int id) {
//		return es.showAllRevenueByEvent(id);
//	}
	
	@GetMapping("/showeventrevenue/{id}")
	public ResponseEntity<?> showAllRevenueByEvent(@PathVariable("id") int id) {
	    double revenue = es.showAllRevenueByEvent(id);

	    if (revenue > 0) {
	        // Return the revenue with a 200 OK status
	        Map<String, Double> response = new HashMap<>();
	        response.put("revenue", revenue);
	        return new ResponseEntity<Map<String, Double>>(response, HttpStatus.OK);
	    } else {
	        // Return a message with a 404 Not Found status if no revenue is found
	        return new ResponseEntity<String>("No revenue found for the specified Id.", HttpStatus.NOT_FOUND);
	    }
	}

	
	
	
	
//	@GetMapping("/event/{eventTitle}")
//	public Event getByEventTitle(@PathVariable("eventTitle") String eventTitle) {
//		Event e= es.getByEventTitle(eventTitle);
//		return e;
//	}
	
	@GetMapping("/event/{eventTitle}")
	public ResponseEntity<?> getByEventTitle(@PathVariable("eventTitle") String eventTitle) {
	    Event e = es.getByEventTitle(eventTitle);

	    if (e != null) {
	        // Return the event with a 200 OK status if the event is found
	        return new ResponseEntity<Event>(e, HttpStatus.OK);
	    } else {
	        // Return a message with a 404 Not Found status if the event is not found
	        return new ResponseEntity<String>("Event not found with title: " + eventTitle, HttpStatus.NOT_FOUND);
	    }
	}

	
	
	
	
//	@GetMapping("/{id}/attendees")
//	public List<Attendee> getAllAttendeeByOrganizerId(@PathVariable int id){
//		
//		List<Attendee> attendees = es.getAllAttendeeByOrganizerId(id);
//		
//		return attendees;
//	}
	
//	@GetMapping("/{id}/attendees")
//	public ResponseEntity<?> getAllAttendeeByOrganizerId(@PathVariable int id) {
//	    List<Attendee> attendees = es.getAllAttendeeByOrganizerId(id);
//	    
//	    if (attendees != null && !attendees.isEmpty()) {
//	        // Return the list of attendees with a 200 OK status if attendees are found
//	        return new ResponseEntity<List<Attendee>>(attendees, HttpStatus.OK);
//	    } else {
//	        // Return a message with a 404 Not Found status if no attendees are found
//	        return new ResponseEntity<String>("No attendees found for organizer with ID: " + id, HttpStatus.NOT_FOUND);
//	    }
//	}

	// not working exception
	
	@GetMapping("/{id}/attendees")
	public ResponseEntity<?> getAllAttendeeByOrganizerId(@PathVariable int id) {
	    // Fetching the attendees from service layer
	    List<Attendee> attendees = es.getAllAttendeeByOrganizerId(id);

	    // Check if attendees list is empty or null
	    if (attendees != null && !attendees.isEmpty()) {
	        // Return attendees with HTTP 200 OK status
	        return new ResponseEntity<>(attendees, HttpStatus.OK);
	    } else {
	        // Return error message with HTTP 404 Not Found if no attendees found
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("message", "No attendees found for organizer with ID: " + id);
	        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	    }
	}




	
}
