package com.mphasis.eventify3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mphasis.eventify3.entity.Admin;
import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Login;
import com.mphasis.eventify3.entity.Organizer;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer>{
	
	
	@Query("select a from Admin a where a.adminMail= :email and a.adminPassword= :password")
	Admin findByAdminEmailAndPassword(@Param("email") String email,@Param("password") String password);

//	@Query("select a from Attendee a where a.attendeeEmail= :email and a.attendeePassword= :password")
//	Attendee findByAttendeeEmailAndPassword(@Param("email") String email,@Param("password") String password);
//	
//	@Query("select o from Organizer o where o.organizerEmail= :email and o.organizerPassword= :password")
//	Organizer findByOrganizerEmailAndPassword(@Param("email") String email,@Param("password") String password);
}
