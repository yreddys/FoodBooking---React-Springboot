package com.hotel.notes;

import com.hotel.entity.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Note {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String content;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id") // foreign key column
	private Users user;

	// No-args constructor
	public Note() {
	}

	// All-args constructor
	public Note(Long id, String content, Users user) {
		this.id = id;
		this.content = content;
		this.user = user;
	}

	// Getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		String result = "Note{" + "id=" + id + ", content='" + content + '\'' + ", user="
				+ (user != null ? user.getUsername() : "null") + '}';
		System.out.println(result);
		return result;
	}
}
