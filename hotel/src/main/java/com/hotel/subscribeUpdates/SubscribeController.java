package com.hotel.subscribeUpdates;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.email.EmailService;

import jakarta.validation.ValidationException;

@RestController
@RequestMapping("/api/subscribe")
@CrossOrigin
public class SubscribeController {

	@Autowired
	private EmailService emailService;

	@Autowired
	private SubscriptionRepository subscriptionRepo;

	// ✅ 1. Send OTP to email
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendSubscriptionOtp(@RequestBody Map<String, String> request) {
		String email = request.get("email");

		if (email == null || email.isEmpty()) {
			throw new ValidationException("Email is required");
		}

		if (subscriptionRepo.existsByEmail(email)) {
			throw new ValidationException("You are already subscribed!");
		}

		emailService.sendOtpEmail(email);
		return ResponseEntity.ok("OTP sent to your email");
	}

	// ✅ 2. Verify OTP and subscribe
	@PostMapping("/verify")
	public ResponseEntity<String> verifySubscriptionOtp(@RequestBody Map<String, String> request) {
		String otp = request.get("otp");

		if (otp == null || otp.trim().isEmpty()) {
			throw new ValidationException("OTP is required");
		}

		if (!emailService.verifyOtp(otp)) {
			throw new ValidationException("Invalid or expired OTP");
		}

		String email = emailService.getEmailByOtp(otp);

		if (subscriptionRepo.existsByEmail(email)) {
			throw new ValidationException("You are already subscribed!");
		}

		Subscription subscription = new Subscription();
		subscription.setEmail(email);
		subscription.setVerified(true);
		subscriptionRepo.save(subscription);
		emailService.sendWelcomeEmail(email);
		emailService.removeOtp(email);

		return ResponseEntity.ok("🎉 Thanks for subscribing! You'll receive updates.");
	}

	// ✅ Global error handler for validation and other errors
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleException(Exception e) {
		return ResponseEntity.badRequest().body("❌ " + e.getMessage());
	}
}
