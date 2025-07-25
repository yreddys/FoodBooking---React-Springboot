package com.hotel.payment;

import com.hotel.entity.Users;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String razorpayOrderId;
	private String razorpayPaymentId;
	private String razorpaySignature;

	private int amount;
	private String status; // CREATED, SUCCESS, FAILED

	private LocalDateTime paymentDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Users user;

	public Payment() {
	}

	public Payment(String razorpayOrderId, int amount, Users user) {
		this.razorpayOrderId = razorpayOrderId;
		this.amount = amount;
		this.user = user;
		this.status = "CREATED";
		this.paymentDate = LocalDateTime.now();
	}

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public String getRazorpayOrderId() {
		return razorpayOrderId;
	}

	public void setRazorpayOrderId(String razorpayOrderId) {
		this.razorpayOrderId = razorpayOrderId;
	}

	public String getRazorpayPaymentId() {
		return razorpayPaymentId;
	}

	public void setRazorpayPaymentId(String razorpayPaymentId) {
		this.razorpayPaymentId = razorpayPaymentId;
	}

	public String getRazorpaySignature() {
		return razorpaySignature;
	}

	public void setRazorpaySignature(String razorpaySignature) {
		this.razorpaySignature = razorpaySignature;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Payment [id=" + id + ", razorpayOrderId=" + razorpayOrderId + ", razorpayPaymentId=" + razorpayPaymentId
				+ ", razorpaySignature=" + razorpaySignature + ", amount=" + amount + ", status=" + status
				+ ", paymentDate=" + paymentDate + ", user=" + user + "]";
	}
	
}
