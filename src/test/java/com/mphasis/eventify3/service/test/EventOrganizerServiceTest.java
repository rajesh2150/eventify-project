package com.mphasis.eventify3.service.test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.EventOrganizerExceptionHandler;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;
import com.mphasis.eventify3.service.EventOrganizerService;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class) // Use this annotation to initialize mocks
public class EventOrganizerServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private OrganizerRepository organizerRepository;

    @InjectMocks
    private EventOrganizerService eventOrganizerService;

    private Event event;

    @BeforeEach
    public void setUp() {
        event = new Event();
        event.setEventId(1);
        event.setEventTitle("Test Event");
        event.setEventType("Music");
        event.setEventPrice(100.0);
    }

  
    @Test
    void testAddEvent_Success() throws EventOrganizerExceptionHandler {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(false); // Event doesn't exist

        // Act
        Event result = eventOrganizerService.addEvent(event);

        // Assert
        assertNotNull(result);
        assertEquals(event.getEventId(), result.getEventId());
        verify(eventRepository, times(1)).save(event);  // Ensure save was called once
    }

    @Test
    void testAddEvent_Failure() {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(true);  // Event exists

        // Act & Assert
        EventOrganizerExceptionHandler thrown = assertThrows(EventOrganizerExceptionHandler.class, () -> {
            eventOrganizerService.addEvent(event);
        });

        assertEquals("Event is Already There", thrown.getMessage());
        verify(eventRepository, never()).save(event);  // Ensure save was never called
    }

    // Test for updateEvent
    @Test
    void testUpdateEvent_Success() throws EventOrganizerExceptionHandler {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(true);  // Event exists

        // Act
        Event result = eventOrganizerService.updateEvent(event);

        // Assert
        assertNotNull(result);
        assertEquals(event.getEventId(), result.getEventId());
        verify(eventRepository, times(1)).save(event);  // Ensure save was called once
    }

    @Test
    void testUpdateEvent_Failure() {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(false);  // Event doesn't exist

        // Act & Assert
        EventOrganizerExceptionHandler thrown = assertThrows(EventOrganizerExceptionHandler.class, () -> {
            eventOrganizerService.updateEvent(event);
        });

        assertEquals("Event is Not Valid", thrown.getMessage());
        verify(eventRepository, never()).save(event);  // Ensure save was never called
    }

    // Test for deleteEvent
    @Test
    void testDeleteEvent_Success() throws EventOrganizerExceptionHandler {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(true);  // Event exists
        when(eventRepository.findById(event.getEventId())).thenReturn(Optional.of(event));

        // Act
        Optional<Event> result = eventOrganizerService.deleteEvent(event.getEventId());

        // Assert
        assertTrue(result.isPresent());
        assertEquals(event.getEventId(), result.get().getEventId());
        verify(eventRepository, times(1)).deleteById(event.getEventId());  // Ensure delete was called once
    }

    @Test
    void testDeleteEvent_Failure() {
        // Arrange
        when(eventRepository.existsById(event.getEventId())).thenReturn(false);  // Event doesn't exist

        // Act & Assert
        EventOrganizerExceptionHandler thrown = assertThrows(EventOrganizerExceptionHandler.class, () -> {
            eventOrganizerService.deleteEvent(event.getEventId());
        });

        assertEquals("Event is Not Valid To delete", thrown.getMessage());
        verify(eventRepository, never()).deleteById(event.getEventId());  // Ensure delete was never called
    }

    // Test for getAllAttendeesByEventId
    @Test
    void testGetAllAttendeesByEventId() {
        // Arrange
        when(organizerRepository.findAllByEventId(event.getEventId())).thenReturn(List.of(new Attendee(), new Attendee()));

        // Act
        List<Attendee> attendees = eventOrganizerService.getAllAttendeesByEventId(event.getEventId());

        // Assert
        assertNotNull(attendees);
        assertEquals(2, attendees.size());
        verify(organizerRepository, times(1)).findAllByEventId(event.getEventId());  // Ensure method was called once
    }

    // Test for getAllTicketBookingsByEventId
    @Test
    void testGetAllTicketBookingsByEventId_Success() throws EventOrganizerExceptionHandler {
        // Arrange
        when(organizerRepository.findAllTicketBookingsByEventId(event.getEventId())).thenReturn(List.of(new TicketBooking(), new TicketBooking()));

        // Act
        List<TicketBooking> bookings = eventOrganizerService.getAllTicketBookingsByEventId(event.getEventId());

        // Assert
        assertNotNull(bookings);
        assertEquals(2, bookings.size());
        verify(organizerRepository, times(1)).findAllTicketBookingsByEventId(event.getEventId());  // Ensure method was called once
    }

    @Test
    void testGetAllTicketBookingsByEventId_Failure() {
        // Arrange
        when(organizerRepository.findAllTicketBookingsByEventId(event.getEventId())).thenReturn(List.of());  // No bookings

        // Act & Assert
        EventOrganizerExceptionHandler thrown = assertThrows(EventOrganizerExceptionHandler.class, () -> {
            eventOrganizerService.getAllTicketBookingsByEventId(event.getEventId());
        });

        assertEquals("Event Has No Bookings", thrown.getMessage());
        verify(organizerRepository, times(1)).findAllTicketBookingsByEventId(event.getEventId());  // Ensure method was called once
    }

   

    // Test for getByEventTitle
    @Test
    void testGetByEventTitle() {
        // Arrange
        when(eventRepository.findByEventTitle("Test Event")).thenReturn(event);

        // Act
        Event result = eventOrganizerService.getByEventTitle("Test Event");

        // Assert
        assertNotNull(result);
        assertEquals("Test Event", result.getEventTitle());
        verify(eventRepository, times(1)).findByEventTitle("Test Event");  // Ensure method was called once
    }

    // Test for getOrganizerIdByEmail
    @Test
    void testGetOrganizerIdByEmail() {
        // Arrange
        when(organizerRepository.findOrganizerIdByEmail("test@example.com")).thenReturn(1);

        // Act
        int organizerId = eventOrganizerService.getOrganizerIdByEmail("test@example.com");

        // Assert
        assertEquals(1, organizerId);
        verify(organizerRepository, times(1)).findOrganizerIdByEmail("test@example.com");  // Ensure method was called once
    }
}


