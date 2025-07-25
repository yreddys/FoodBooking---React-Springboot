package com.hotel.payload;

import java.util.Set;

public class UserProfileDto {
	private String userName;
	private Set<String> roles;
	private boolean enabled;
	private boolean isPremium;

	// ✅ Updated Constructor to include isPremium
	public UserProfileDto(String userName, Set<String> roles, boolean enabled, boolean isPremium) {
		this.userName = userName;
		this.roles = roles;
		this.enabled = enabled;
		this.isPremium = isPremium;
	}

	// === Getters and Setters ===
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

	public boolean isPremium() {
		return isPremium;
	}

	public void setPremium(boolean premium) {
		isPremium = premium;
	}
}
