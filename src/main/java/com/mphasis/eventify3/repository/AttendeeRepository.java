package com.mphasis.eventify3.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Event;

@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, Integer> {
//    Optional<Attendee> findByAttendeeEmail(String email);
	
	@Query("select e from Event e where e.eventType= :type")
	List<Event> findAllEventByEventType(@Param("type") String eventType);
	
	@Query("SELECT e FROM Event e WHERE e.eventStartTime = :date")
	List<Event> findAllEventByEventDate(@Param("date") LocalDateTime eventDate);
	
	@Query("SELECT e FROM Event e WHERE e.eventLocation = :location")
	List<Event> findAllEventByEventLocation(@Param("location") String location);
	
	
	@Query("select a.attendeeId, a.attendeeName,a.attendeeEmail,a.attendeePhoneNumber,a.attendeeIsSuspended,a.role from Attendee a")
	List<Object[]> findAllAttendee();
	
//	@Query(value="select attendee_id from attendee where attendee_email= :email",nativeQuery = true)
//	int findAttendeeIdByEmail(@Param("email") String email);
	
	@Query(value="select attendee_id from attendee where attendee_email = :email", nativeQuery = true)
	Integer findAttendeeIdByEmail(@Param("email") String email);

//	select event_title from events where event_id in (select event_id from ticket_booking where  attendee_id=1)
	
//	@Query("select e.eventTitle, e.eventLocation, e.eventStartTime, e.eventType, e.eventDescription from Event e e.eventId in ( select tb.event from TicketBooking tb where tb.organizer= :id")
//	List<Event> findAllEventsByAttendeeId(@Param("id") int id);
	
//	select attendee_is_suspended from attendee where attendee_id=1
	
	@Query(value="select attendee_is_suspended from attendee where attendee_id= :id", nativeQuery = true)
	boolean findAttendeeIsSuspendedById(@Param("id") int id);
}
