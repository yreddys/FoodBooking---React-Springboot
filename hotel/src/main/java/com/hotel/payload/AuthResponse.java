package com.hotel.payload;

import java.util.Set;

public class AuthResponse {

	private String token;
	private Set<String> roles;
	private boolean forcePasswordChange;

	// Default constructor
	public AuthResponse() {
	}

	// Constructor with token only
	public AuthResponse(String token) {
		this.token = token;
	}

	// Constructor with token and roles
	public AuthResponse(String token, Set<String> roles) {
		this.token = token;
		this.roles = roles;
	}

	// Constructor with all fields
	public AuthResponse(String token, Set<String> roles, boolean forcePasswordChange) {
		this.token = token;
		this.roles = roles;
		this.forcePasswordChange = forcePasswordChange;
	}

	// Getters and Setters
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public boolean isForcePasswordChange() {
		return forcePasswordChange;
	}

	public void setForcePasswordChange(boolean forcePasswordChange) {
		this.forcePasswordChange = forcePasswordChange;
	}

	@Override
	public String toString() {
		return "AuthResponse{" +
				"token='" + token + '\'' +
				", roles=" + roles +
				", forcePasswordChange=" + forcePasswordChange +
				'}';
	}
}
