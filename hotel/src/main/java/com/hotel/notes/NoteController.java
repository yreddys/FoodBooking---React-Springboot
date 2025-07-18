package com.hotel.notes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.entity.Users;
import com.hotel.repository.UserRepo;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
public class NoteController {

	@Autowired
	private NoteRepository noteRepository;

	@Autowired
	private UserRepo userRepository;

	// only admin can update this
	@PostMapping("/save")
	// @PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> saveNote(@RequestBody Note note, @AuthenticationPrincipal UserDetails userDetails) {
		Users user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();

		note.setUser(user);
		System.out.println("user" + user);
		System.out.println("note" + note);
		System.out.println("User Details: " + user.getUsername());
		System.out.println("Note Content: " + note.getContent());

		noteRepository.save(note);
		return ResponseEntity.ok("Note saved");
	}

// logged in user can see this 
	@GetMapping("/my-notes")
	public ResponseEntity<List<Note>> getMyNotes(@AuthenticationPrincipal UserDetails userDetails) {
		Users user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
		List<Note> notes = noteRepository.findByUser(user);

		// 🔽 Print each note
		for (Note note : notes) {
			System.out.println(note);
		}

		return ResponseEntity.ok(notes);
	}

}
