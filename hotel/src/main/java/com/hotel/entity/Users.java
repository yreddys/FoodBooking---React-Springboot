package com.hotel.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class Users implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	@Column(nullable = false, unique = true)
	private String userName;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private boolean enabled = false; // Default to false until email is verified

	@Column(name = "verification_token")
	private String verificationToken; // For email verification only

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> role = new HashSet<>();

	// === Constructors ===

	public Users() {
	}

	public Users(int userId, String userName, String password, Set<Role> role) {
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.role = role;
	}

	// === Getters and Setters ===

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRole() {
		return role;
	}

	public void setRole(Set<Role> role) {
		this.role = role;
	}

	// === UserDetails Interface Methods ===

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return role.stream().map(r -> (GrantedAuthority) () -> "ROLE_" + r.getRoleName()).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.userName; // <-- FIXED this line
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

//	@Override
//	public boolean isEnabled() {
//		return true;
//	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getVerificationToken() {
		return verificationToken;
	}

	public void setVerificationToken(String verificationToken) {
		this.verificationToken = verificationToken;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}
}
