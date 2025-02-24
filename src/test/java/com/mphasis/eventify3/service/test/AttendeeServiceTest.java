package com.mphasis.eventify3.service.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;
import com.mphasis.eventify3.entity.Feedback;
import com.mphasis.eventify3.entity.TicketBooking;
import com.mphasis.eventify3.exception.AttendeeExceptionHandler;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.EventRepository;
import com.mphasis.eventify3.repository.FeedbackRepository;
import com.mphasis.eventify3.repository.TicketBookingRepository;
import com.mphasis.eventify3.service.AttendeeService;

//two test case are failed 


public class AttendeeServiceTest {

    @Mock
    private AttendeeRepository attendeeRepo;
    
    @Mock
    private TicketBookingRepository ticketBookingRepo;
    
    @Mock
    private FeedbackRepository feedbackRepository;
    
    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private AttendeeService attendeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test for getAllEventsByEventType
    @Test
    void testGetAllEventsByEventType() {
        String eventType = "Music";
        Event event = new Event();
        event.setEventTitle("Rock Concert");
        event.setEventType("Music");
        
        when(eventRepository.findAll()).thenReturn(List.of(event));

        List<Event> events = attendeeService.getAllEventsByEventType(eventType);
        
        assertNotNull(events);
        assertEquals(1, events.size());
        assertEquals("Rock Concert", events.get(0).getEventTitle());
    }

    // Test for giveFeedback (valid case)
    @Test
    void testGiveFeedback_valid() throws AttendeeExceptionHandler {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(1);
        feedback.setAttendeeId(1);
        feedback.setEventId(1);
        
        when(feedbackRepository.existsById(feedback.getFeedbackId())).thenReturn(false);
        when(eventRepository.existsById(feedback.getEventId())).thenReturn(true);
        when(attendeeRepo.existsById(feedback.getAttendeeId())).thenReturn(true);
        
        Feedback savedFeedback = new Feedback();
        savedFeedback.setFeedbackId(1);
        when(feedbackRepository.save(feedback)).thenReturn(savedFeedback);
        
        Feedback result = attendeeService.giveFeedback(feedback);
        
        assertNotNull(result);
        assertEquals(feedback.getFeedbackId(), result.getFeedbackId());
    }

    // Test for giveFeedback (invalid: already given feedback)
    @Test
    void testGiveFeedback_alreadyGiven() {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(1);
        feedback.setAttendeeId(1);
        feedback.setEventId(1);
        
        when(feedbackRepository.existsById(feedback.getFeedbackId())).thenReturn(true);
        
        AttendeeExceptionHandler thrown = assertThrows(AttendeeExceptionHandler.class, () -> {
            attendeeService.giveFeedback(feedback);
        });
        
        assertEquals("Already Feedback Given", thrown.getMessage());
    }

    // Test for bookTicket
    @Test
    void testBookTicket() {
        TicketBooking ticketBooking = new TicketBooking();
        ticketBooking.setBookingId(1);
        ticketBooking.setAttendeeId(1);
        
        Attendee attendee = new Attendee();
        attendee.setAttendeeId(1);
        
        when(attendeeRepo.findById(1)).thenReturn(Optional.of(attendee));
        when(ticketBookingRepo.save(ticketBooking)).thenReturn(ticketBooking);
        
        TicketBooking result = attendeeService.bookTicket(ticketBooking);
        
        assertNotNull(result);
        assertEquals(ticketBooking.getBookingId(), result.getBookingId());
    }
}
