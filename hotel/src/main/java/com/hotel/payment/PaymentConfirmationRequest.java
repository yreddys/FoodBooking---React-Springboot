package com.hotel.payment;

public class PaymentConfirmationRequest {
	private String orderId;
	private String paymentId;
	private String signature;

	// Getters and Setters
	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	@Override
	public String toString() {
		return "PaymentConfirmationRequest [orderId=" + orderId + ", paymentId=" + paymentId + ", signature="
				+ signature + "]";
	}
	
}
