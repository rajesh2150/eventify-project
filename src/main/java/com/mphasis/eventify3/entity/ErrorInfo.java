package com.mphasis.eventify3.entity;

import java.time.LocalDateTime;

public class ErrorInfo {
	LocalDateTime dateTime;
	String errorMessage;
	String uri;
	public ErrorInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ErrorInfo(LocalDateTime dateTime, String errorMessage, String uri) {
		super();
		this.dateTime = dateTime;
		this.errorMessage = errorMessage;
		this.uri = uri;
	}
	public LocalDateTime getDateTime() {
		return dateTime;
	}
	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	@Override
	public String toString() {
		return "ErrorInfo [dateTime=" + dateTime + ", errorMessage=" + errorMessage + ", uri=" + uri + "]";
	}
	
}
 