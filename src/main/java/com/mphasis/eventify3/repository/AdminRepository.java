package com.mphasis.eventify3.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Event;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
	
    Optional<Admin> findByAdminMailAndAdminPassword(String email,String password);
    
//    @Query("SELECT e FROM Event e WHERE e.eventId IN (SELECT tb.event.eventId FROM TicketBooking tb WHERE tb.attendee.id = :id)")
//	List<Event> findAllEventsByAttendeeId(@Param("id") int id);
 

}
