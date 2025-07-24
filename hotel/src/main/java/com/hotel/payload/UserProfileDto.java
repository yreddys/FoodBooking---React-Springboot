package com.hotel.payload;

import java.util.Set;

public class UserProfileDto {
	private String userName;
	private Set<String> roles;
	private boolean enabled;

	// Constructor
	public UserProfileDto(String userName, Set<String> roles, boolean enabled) {
		this.userName = userName;
		this.roles = roles;
		this.enabled = enabled;
	}

	// Getters and Setters
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
}
