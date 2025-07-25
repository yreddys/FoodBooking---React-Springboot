package com.hotel.payment;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class FreeLimitExceededExceptionHandler {
	@ExceptionHandler(FreeLimitExceededException.class)
	public ResponseEntity<String> handleLimitException(FreeLimitExceededException ex) {
		return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(ex.getMessage());
	}
}
