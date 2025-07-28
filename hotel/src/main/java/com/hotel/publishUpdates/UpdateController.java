package com.hotel.publishUpdates;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.email.EmailService;
import com.hotel.entity.Users;
import com.hotel.repository.UserRepo;
import com.hotel.subscribeUpdates.Subscription;
import com.hotel.subscribeUpdates.SubscriptionRepository;

@RestController
@RequestMapping("/api/admin/updates")
@CrossOrigin
public class UpdateController {

	@Autowired
	private UpdatePostRepository updateRepo;

	@Autowired
	private SubscriptionRepository subscriptionRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private EmailService emailService;

	// ✅ Only allow ADMINs to publish updates
	@PostMapping("/publish")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> publishUpdate(@RequestBody UpdatePost updatePost) {
		updateRepo.save(updatePost);

		String subject = updatePost.getSubject();
		String body = updatePost.getBody();

		// Notify subscribed users
		List<Subscription> subscribers = subscriptionRepo.findAll();
		for (Subscription sub : subscribers) {
			emailService.sendUpdateNotification(sub.getEmail(), subject, body);
		}

		// Notify registered users
		List<Users> users = userRepo.findAll();
		for (Users user : users) {
			emailService.sendUpdateNotification(user.getUserName(), subject, body);
		}

		return ResponseEntity.ok("✅ Update published and emails sent to subscribers and users.");
	}
}
