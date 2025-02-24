package com.mphasis.eventify3.exception;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.mphasis.eventify3.entity.ErrorInfo;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(AdminExceptionHandler.class)
	public ErrorInfo AdminExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}

	
	@ExceptionHandler(AttendeeExceptionHandler.class)
	public ErrorInfo AttendeeExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}
	
	
	@ExceptionHandler(EventOrganizerExceptionHandler.class)
	public ErrorInfo EventOrganizerExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}
	
	
	@ExceptionHandler(LoginExceptionHandler.class)
	public ErrorInfo LoginExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}
	
	@ExceptionHandler(RegisterExceptionHandler.class)
	public ErrorInfo RegisterExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}
	
	@ExceptionHandler(UserExceptionHandler.class)
	public ErrorInfo UserExceptionHandler(Exception e , HttpServletRequest h) {
		return new ErrorInfo(LocalDateTime.now(),e.getMessage(),h.getRequestURI());
		
	}
}
