package com.mphasis.eventify3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mphasis.eventify3.entity.Attendee;
import com.mphasis.eventify3.entity.Organizer;
import com.mphasis.eventify3.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
	
//	@Query(" insert into User(User.email,User.password,User.role) values(:email,:password,:role)")
//	void saveAttendee(@Param("email")String email,@Param("password")String password,@Param("role")String role);
	
	 	@Modifying
	    @Transactional
	    @Query("INSERT INTO User(email, password, role) VALUES(:email, :password, :role)")
	    void saveAttendee(@Param("email") String email, @Param("password") String password, @Param("role") String role);
	 	
	 	
	 	@Modifying
	    @Transactional
	 	@Query("INSERT INTO User(email, password, role) VALUES(:email, :password, :role)")
	    void saveOrganizer(@Param("email") String email, @Param("password") String password, @Param("role") String role);


	 	@Query(value="select role from users where email= :email and password= :pwd",nativeQuery = true)
		String loginAttendee(@Param("email") String email,@Param("pwd") String pwd);


	 	@Query(value="select role from users where email= :email and password= :pwd",nativeQuery = true)
		String loginOrganizer(@Param("email") String email,@Param("pwd") String pwd);


		
	 
}
