package com.hotel.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${mail.from-email}")
	private String fromEmail;

	private Map<String, String> otpStore = new ConcurrentHashMap<>(); // email -> otp
	private Map<String, String> otpToEmail = new ConcurrentHashMap<>(); // otp -> email

	public void sendOtpEmail(String email) {
		String otp = generateOtp();
		otpStore.put(email, otp);
		otpToEmail.put(otp, email);

		String subject = "Your OTP for Email Verification";
		String body = "Welcome to Note App!\n\nYour OTP for verification is: " + otp
				+ "\n\nDo not share it with anyone.\n\nThank you!";

		sendEmail(email, subject, body);
	}

	private String generateOtp() {
		Random random = new Random();
		int otpNumber = 100000 + random.nextInt(9000); // ✅ Correct 4-digit range
		return String.valueOf(otpNumber);
	}

	public void sendEmail(String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		javaMailSender.send(message);
	}

	public boolean verifyOtp(String otp) {
		return otpToEmail.containsKey(otp); // ✅ Correct check
	}

	public String getEmailByOtp(String otp) {
		return otpToEmail.get(otp);
	}

	public void removeOtp(String email) {
		String otp = otpStore.remove(email);
		if (otp != null) {
			otpToEmail.remove(otp);
		}
	}

	public void sendWelcomeEmail(String email) {
		String subject = "Welcome to Note Keeper 🎉";
		String body = "Hi there!\n\n" + "Thanks for subscribing to Note Keeper. 📝\n\n"
				+ "You'll now receive the latest updates, tips, and features directly to your inbox.\n\n"
				+ "Happy Note Taking!\n\n" + "— Team Note Keeper";

		sendEmail(email, subject, body);
	}

	public void sendUpdateNotification(String email, String subject, String body) {
		sendEmail(email, subject, body);
	}

	public void sendTemporaryPasswordEmail(String email, String tempPassword) {
		String subject = "Temporary Password - Action Required";
		String body = "Hi,\n\n" + "You've been registered.\n" + "👉 Temporary password: " + tempPassword + "\n\n"
				+ "Please login and change your password immediately.\n\n"
				 + "Thanks,\nTeam";

		sendEmail(email, subject, body);
	}

}
