package com.hotel.notes;

import com.hotel.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
	List<Note> findByUser(Users user);

	List<Note> findByUserAndTitleContainingIgnoreCase(Users user, String title);
}