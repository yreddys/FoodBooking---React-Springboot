package com.hotel.interests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interests")
@CrossOrigin
public class InterestFetchingController {
	@Autowired
	private InterestEmailService interestEmailService;

	@PostMapping("/send-interest-emails")
	@PreAuthorize("hasRole('ADMIN')")
	public String sendEmails() {
		interestEmailService.sendInterestEmails();
		return "Emails sent successfully";
	}
}
