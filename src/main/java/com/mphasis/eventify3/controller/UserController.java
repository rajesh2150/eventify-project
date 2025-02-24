package com.mphasis.eventify3.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.service.UserService;

@RestController
@RequestMapping("/eventify/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
//	@PostMapping("/attendee/register")
//	public Attendee registerAttendee(@RequestBody Attendee attendee) {
//		
//		return userService.registerAttendee(attendee);
//		
//	}
	
	@PostMapping("/attendee/register")
	public ResponseEntity<?> registerAttendee(@RequestBody Attendee attendee) {
	    try {
	        // Call the service to register the attendee
	        Attendee registeredAttendee = userService.registerAttendee(attendee);
	        
	        // Return 201 Created if registration is successful
	        return new ResponseEntity<>(registeredAttendee, HttpStatus.CREATED);
	    } catch (Exception e) {
	       
	        return new ResponseEntity<String>("Error in Registering", HttpStatus.BAD_REQUEST);
	    }
	}


//	@PostMapping("/organizer/register")
//	public Organizer registerOrganizer(@RequestBody Organizer organizer) {
//		
//		return userService.registerOrganizer(organizer);
//		
//	}
	
	
	@PostMapping("/organizer/register")
	public ResponseEntity<?> registerOrganizer(@RequestBody Organizer organizer) {
	    try {
	        // Call the service to register the organizer
	        Organizer registeredOrganizer = userService.registerOrganizer(organizer);

	        // Return 201 Created if registration is successful
	        return new ResponseEntity<>(registeredOrganizer, HttpStatus.CREATED);
	    } catch (Exception e) {
	        
	        return new ResponseEntity<String>("Error in Registering", HttpStatus.BAD_REQUEST);
	    }
	}

	
//	@GetMapping("/attendee/register/{email}/{pwd}")
//	public String loginAttendee(@PathVariable String email, @PathVariable String pwd) {
//		
//		String isAttendee =  userService.loginAttendee(email,pwd);
//		
//		if(isAttendee !=null) {
//		
//			return isAttendee;
//		}
//		else {
//			return isAttendee;
//		}
//		 
//		}
//	
//	
//	@GetMapping("/organizer/register/{email}/{pwd}")
//	public String loginOrganizer(@PathVariable String email, @PathVariable String pwd) {
//		
//		String isAttendee =  userService.loginAttendee(email,pwd);
//		
//		if(isAttendee !=null) {
//		
//			return isAttendee;
//		}
//		else {
//			return isAttendee;
//		}
//		 
//		}
//	@GetMapping("/attendee/login/{email}/{pwd}")
//    public Map<String, String> loginAttendee(@PathVariable String email, @PathVariable String pwd) {
//        String role = userService.loginAttendee(email, pwd);
//        Map<String, String> response = new HashMap<>();
//        response.put("role", role != null ? role : "Invalid credentials");
//        return response;
//    }

	@GetMapping("/attendee/login/{email}/{pwd}")
	public ResponseEntity<Map<String, String>> loginAttendee(@PathVariable String email, @PathVariable String pwd) {
	    String role = userService.loginAttendee(email, pwd);
	    Map<String, String> response = new HashMap<>();

	    if (role != null) {
	        response.put("role", role);
	        return new ResponseEntity<>(response, HttpStatus.OK);  // Return 200 OK if login is successful
	    } else {
	        response.put("message", "Invalid credentials");
	        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);  // Return 401 Unauthorized if login fails
	    }
	}

	
//    @GetMapping("/organizer/login/{email}/{pwd}")
//    public Map<String, String> loginOrganizer(@PathVariable String email, @PathVariable String pwd) {
//        String role = userService.loginOrganizer(email, pwd);
//        Map<String, String> response = new HashMap<>();
//        response.put("role", role != null ? role : "Invalid credentials");
//        return response;
//    }
	
	@GetMapping("/organizer/login/{email}/{pwd}")
	public ResponseEntity<Map<String, String>> loginOrganizer(@PathVariable String email, @PathVariable String pwd) {
	    String role = userService.loginOrganizer(email, pwd); // Fetch role based on email and password
	    Map<String, String> response = new HashMap<>();

	    if (role != null) {
	        response.put("role", role);  // Login successful, return role
	        return new ResponseEntity<>(response, HttpStatus.OK);  // Return 200 OK
	    } else {
	        response.put("message", "Invalid credentials");  // Login failed
	        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);  // Return 401 Unauthorized
	    }
	}

}
