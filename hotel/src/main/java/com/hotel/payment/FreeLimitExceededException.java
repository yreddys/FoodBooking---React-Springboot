package com.hotel.payment;

public class FreeLimitExceededException extends RuntimeException {
	public FreeLimitExceededException(String message) {
		super(message);
	}
}
