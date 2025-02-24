package com.mphasis.eventify3.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;

public interface IAdminService {
	 public List<Object[]> getAllAttendeeUsers();
	 public List<Object[]> getAllOrganizerUsers();
	 public Event updateEvent(Event event) throws EventOrganizerExceptionHandler;
	 public boolean manageUserAccount(int attendeeId, boolean suspend);
	 public boolean manageOrganizerAccount(int organizerId, boolean suspend);
	 public List<Event> getAllEvents();
	 public Map<String, Object> getPlatformAnalytics();
	 public Optional<Admin> loginAdmin(String name, String password);
	 public List<Event> getAllEventsByOrganizerId(int oId);
	 public List<Event> getAllEventsByAttendeeId(int aId);
	 




}
