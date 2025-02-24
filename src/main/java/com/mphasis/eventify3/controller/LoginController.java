//package com.mphasis.eventify3.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.mphasis.eventify3.entity.Admin;
//import com.mphasis.eventify3.entity.Attendee;
//import com.mphasis.eventify3.entity.Organizer;
//import com.mphasis.eventify3.service.LoginService;
//
//@RestController
//@RequestMapping("/eventify/login")
//public class LoginController {
//
//	@Autowired
//	private LoginService loginService;
//	
//	@GetMapping("/admin/{email}/{password}")
//	public Admin loginAsAdmin(@PathVariable("email") String email,@PathVariable("password") String password) {
//		return loginService.loginAsAdmin(email, password);
//	}
//	
//	@GetMapping("/attendee/{email}/{password}")
//	public Attendee loginAsAttendee(@PathVariable("email") String email,@PathVariable("password") String password) {
//		return loginService.loginAsAttendee(email, password);
//	}
//	
//	
//	@GetMapping("/organizer/{email}/{password}")
//	public Organizer loginAsOrganizer(@PathVariable("email") String email,@PathVariable("password") String password) {
//		return loginService.loginAsOrganizer(email, password);
//	}
//}
