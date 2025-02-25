package com.mphasis.eventify3.service.test;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;
import com.mphasis.eventify3.repository.AdminRepository;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;
import com.mphasis.eventify3.service.AdminService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private AttendeeRepository attendeeRepository;

    @Mock
    private OrganizerRepository organizerRepository;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private AdminService adminService;

    private Admin admin;
    private Attendee attendee;
    private Organizer organizer;
    private Event event;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        admin = new Admin();
        admin.setAdminId(1);
        admin.setAdminMail("admin@example.com");
        admin.setAdminPassword("adminpassword");

        attendee = new Attendee();
        attendee.setAttendeeId(1);
        attendee.setAttendeeEmail("attendee@example.com");

        organizer = new Organizer();
        organizer.setOrganizerId(1);
        organizer.setOrganizerEmail("organizer@example.com");

        event = new Event();
        event.setEventId(1);
        event.setEventTitle("Sample Event");
    }



    @Test
    void testManageUserAccountSuspendSuccess() {
        // Arrange
        when(attendeeRepository.findById(1)).thenReturn(Optional.of(attendee));

        // Act
        boolean result = adminService.manageUserAccount(1, true);

        // Assert
        assertTrue(result);
        assertTrue(attendee.isAttendeeIsSuspended());
        verify(attendeeRepository, times(1)).save(attendee);
    }

    @Test
    void testManageUserAccountSuspendFailure() {
        // Arrange
        when(attendeeRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> adminService.manageUserAccount(1, true));
        assertEquals("Attendee not found", thrown.getMessage());
    }

    @Test
    void testManageOrganizerAccountSuspendSuccess() {
        // Arrange
        when(organizerRepository.findById(1)).thenReturn(Optional.of(organizer));

        // Act
        boolean result = adminService.manageOrganizerAccount(1, true);

        // Assert
        assertTrue(result);
        assertTrue(organizer.isOrganizerIsSuspended());
        verify(organizerRepository, times(1)).save(organizer);
    }

    @Test
    void testManageOrganizerAccountSuspendFailure() {
        // Arrange
        when(organizerRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> adminService.manageOrganizerAccount(1, true));
        assertEquals("Organizer not found", thrown.getMessage());
    }

    @Test
    void testGetAllEvents() {
        // Arrange
        when(eventRepository.findAll()).thenReturn(Arrays.asList(event));

        // Act
        List<Event> events = adminService.getAllEvents();

        // Assert
        assertNotNull(events);
        assertEquals(1, events.size());
        assertEquals("Sample Event", events.get(0).getEventTitle());
    }

    @Test
    void testUpdateEventSuccess() throws EventOrganizerExceptionHandler {
        // Arrange
        when(eventRepository.existsById(1)).thenReturn(true);
        when(eventRepository.save(event)).thenReturn(event);

        // Act
        Event result = adminService.updateEvent(event);

        // Assert
        assertNotNull(result);
        assertEquals(event.getEventId(), result.getEventId());
        verify(eventRepository, times(1)).save(event);
    }

    @Test
    void testUpdateEventFailure() {
        // Arrange
        when(eventRepository.existsById(1)).thenReturn(false);

        // Act & Assert
        EventOrganizerExceptionHandler thrown = assertThrows(EventOrganizerExceptionHandler.class, () -> adminService.updateEvent(event));
        assertEquals("Event Id is Not Valid ", thrown.getMessage());
    }
}
