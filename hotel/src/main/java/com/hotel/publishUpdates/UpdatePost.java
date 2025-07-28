package com.hotel.publishUpdates;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UpdatePost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String subject;

	@Column(length = 5000)
	private String body;

	private LocalDateTime createdAt = LocalDateTime.now();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public UpdatePost(Long id, String subject, String body, LocalDateTime createdAt) {
		
		this.id = id;
		this.subject = subject;
		this.body = body;
		this.createdAt = createdAt;
	}
	public UpdatePost() {}

	@Override
	public String toString() {
		return "UpdatePost [id=" + id + ", subject=" + subject + ", body=" + body + ", createdAt=" + createdAt + "]";
	}
	
}
