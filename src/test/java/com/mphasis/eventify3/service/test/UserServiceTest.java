package com.mphasis.eventify3.service.test;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.repository.AttendeeRepository;
import com.mphasis.eventify3.repository.OrganizerRepository;
import com.mphasis.eventify3.repository.UserRepo;
import com.mphasis.eventify3.service.UserService;

@SpringBootTest
class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private AttendeeRepository attendeeRepository;

    @Mock
    private OrganizerRepository organizerRepository;

    @InjectMocks
    private UserService userService;

    private Attendee attendee;
    private Organizer organizer;

    @BeforeEach
    void setUp() {
        // Initialize Attendee and Organizer objects
        attendee = new Attendee();
        attendee.setAttendeeName("John Doe");
        attendee.setAttendeeEmail("john.doe@example.com");
        attendee.setAttendeePassword("password");
        attendee.setAttendeePhoneNumber("1234567890");

        organizer = new Organizer();
        organizer.setOrganizerName("Event Organizer");
        organizer.setOrganizerEmail("organizer@example.com");
        organizer.setOrganizerPassword("password");
        organizer.setOrganizerPhoneNumber("0987654321");
    }

    @Test
    void testRegisterAttendee() {
        // Arrange: Mock behavior of repositories
        when(attendeeRepository.save(any(Attendee.class))).thenReturn(attendee);
        doNothing().when(userRepo).saveAttendee(anyString(), anyString(), anyString());

        // Act: Call the service method
        Attendee result = userService.registerAttendee(attendee);

        // Assert: Validate the behavior and the result
        assertNotNull(result);
        assertEquals(attendee.getAttendeeEmail(), result.getAttendeeEmail());
        verify(attendeeRepository, times(1)).save(attendee);
        verify(userRepo, times(1)).saveAttendee(attendee.getAttendeeEmail(), attendee.getAttendeePassword(), "attendee");
    }

    @Test
    void testRegisterOrganizer() {
        // Arrange: Mock behavior of repositories
        when(organizerRepository.save(any(Organizer.class))).thenReturn(organizer);
        doNothing().when(userRepo).saveOrganizer(anyString(), anyString(), anyString());

        // Act: Call the service method
        Organizer result = userService.registerOrganizer(organizer);

        // Assert: Validate the behavior and the result
        assertNotNull(result);
        assertEquals(organizer.getOrganizerEmail(), result.getOrganizerEmail());
        verify(organizerRepository, times(1)).save(organizer);
        verify(userRepo, times(1)).saveOrganizer(organizer.getOrganizerEmail(), organizer.getOrganizerPassword(), "organizer");
    }

    @Test
    void testLoginAttendee_Success() {
        // Arrange: Mock the behavior of the login method
        when(userRepo.loginAttendee(anyString(), anyString())).thenReturn("Login Successful");

        // Act: Call the login method
        String result = userService.loginAttendee("john.doe@example.com", "password");

        // Assert: Validate the behavior and the result
        assertEquals("Login Successful", result);
        verify(userRepo, times(1)).loginAttendee("john.doe@example.com", "password");
    }

    @Test
    void testLoginOrganizer_Success() {
        // Arrange: Mock the behavior of the login method
        when(userRepo.loginOrganizer(anyString(), anyString())).thenReturn("Login Successful");

        // Act: Call the login method
        String result = userService.loginOrganizer("organizer@example.com", "password");

        // Assert: Validate the behavior and the result
        assertEquals("Login Successful", result);
        verify(userRepo, times(1)).loginOrganizer("organizer@example.com", "password");
    }

    @Test
    void testLoginAttendee_Failure() {
        // Arrange: Mock the behavior of the login method for failure
        when(userRepo.loginAttendee(anyString(), anyString())).thenReturn("Invalid Credentials");

        // Act: Call the login method
        String result = userService.loginAttendee("john.doe@example.com", "wrongpassword");

        // Assert: Validate the behavior and the result
        assertEquals("Invalid Credentials", result);
        verify(userRepo, times(1)).loginAttendee("john.doe@example.com", "wrongpassword");
    }

    @Test
    void testLoginOrganizer_Failure() {
        // Arrange: Mock the behavior of the login method for failure
        when(userRepo.loginOrganizer(anyString(), anyString())).thenReturn("Invalid Credentials");

        // Act: Call the login method
        String result = userService.loginOrganizer("organizer@example.com", "wrongpassword");

        // Assert: Validate the behavior and the result
        assertEquals("Invalid Credentials", result);
        verify(userRepo, times(1)).loginOrganizer("organizer@example.com", "wrongpassword");
    }
}

