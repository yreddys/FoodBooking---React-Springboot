package com.hotel.interests;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.email.EmailService;
import com.hotel.notes.Note;
import com.hotel.notes.NoteRepository;

@Service
public class InterestEmailService {

	@Autowired
	private NoteRepository noteRepository;

	@Autowired
	private EmailService emailService;

	public void sendInterestEmails() {
		// Step 1: Fetch all notes
		List<Note> allNotes = noteRepository.findAll();

		// Step 2: Group titles by user email
		Map<String, Set<String>> userInterests = new HashMap<>();

		for (Note note : allNotes) {
			if (note.getUser() != null && note.getUser().getUserName() != null) {
				String email = note.getUser().getUserName(); // assuming it's email
				userInterests.computeIfAbsent(email, k -> new HashSet<>()).add(note.getTitle());
			}
		}

		// Step 3: Send an email to each user
		for (Map.Entry<String, Set<String>> entry : userInterests.entrySet()) {
			String email = entry.getKey();
			Set<String> interests = entry.getValue();

			if (!interests.isEmpty()) {
				emailService.sendInterestEmail(email, interests); // ✅ pass only that user's interests
			}
		}
	}

}
