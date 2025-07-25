package com.hotel.notes;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.entity.Users;
import com.hotel.payment.FreeLimitExceededException;
import com.hotel.repository.UserRepo;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
public class NoteController {

	@Autowired
	private NoteRepository noteRepository;

	@Autowired
	private UserRepo userRepository;

	// ✅ Save note (logged-in user only)
	@PostMapping("/save")
	public ResponseEntity<String> saveNote(@RequestBody Note note, @AuthenticationPrincipal UserDetails userDetails) {
		Users user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();

		List<Note> existingNotes = noteRepository.findByUser(user);

		if (!user.getIsPremium() && existingNotes.size() >= 5) {
			throw new FreeLimitExceededException("Free note limit reached. Please subscribe to continue.");
		}

		note.setUser(user);
		noteRepository.save(note);
		return ResponseEntity.ok("Note saved");
	}

	// ✅ Get all notes for logged-in user
	@GetMapping("/my-notes")
	public ResponseEntity<List<Note>> getMyNotes(@AuthenticationPrincipal UserDetails userDetails) {
		Users user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
		List<Note> notes = noteRepository.findByUser(user);
		return ResponseEntity.ok(notes);
	}

	// ✅ Update note (only owner can update)
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateNote(@PathVariable("id") Long id, @RequestBody Note updatedNote,
			@AuthenticationPrincipal UserDetails userDetails) {

		Users currentUser = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
		Optional<Note> optionalNote = noteRepository.findById(id);

		if (optionalNote.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Note existingNote = optionalNote.get();
		if (existingNote.getUser() == null || existingNote.getUser().getUserId() != currentUser.getUserId()) {
			return ResponseEntity.status(403).body("You are not authorized to update this note");
		}

		existingNote.setContent(updatedNote.getContent());
		noteRepository.save(existingNote);
		return ResponseEntity.ok("Note updated successfully");
	}

	// ✅ Delete note (only owner can delete)
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteNote(@PathVariable("id") Long id,
			@AuthenticationPrincipal UserDetails userDetails) {

		Users currentUser = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
		Optional<Note> optionalNote = noteRepository.findById(id);

		if (optionalNote.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Note existingNote = optionalNote.get();
		if (existingNote.getUser() == null || existingNote.getUser().getUserId() != currentUser.getUserId()) {
			return ResponseEntity.status(403).body("You are not authorized to delete this note");
		}

		noteRepository.delete(existingNote);
		return ResponseEntity.ok("Note deleted successfully");
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Note>> searchNotesByTitle(
	        @RequestParam("title") String title,
	        @AuthenticationPrincipal UserDetails userDetails) {
	    Users user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
	    List<Note> notes = noteRepository.findByUserAndTitleContainingIgnoreCase(user, title);
	    return ResponseEntity.ok(notes);
	}

}
