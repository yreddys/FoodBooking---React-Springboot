package com.hotel.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.entity.Role;
import com.hotel.entity.Users;
import com.hotel.jwt.JwtUtil;
import com.hotel.payload.AuthRequest;
import com.hotel.payload.AuthResponse;
import com.hotel.payload.UserProfileDto;
import com.hotel.repository.UserRepo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody Users user) {
		System.out.println("user" + user);
		user.setPassword(encoder.encode(user.getPassword()));

		Set<Role> roles = user.getRole();

		if (roles == null || roles.isEmpty()) {
			// Default to USER role
			Role defaultRole = new Role();
			defaultRole.setRoleName("USER");
			user.setRole(Set.of(defaultRole));
		} else {
			// Normalize role names and ensure proper assignment
			Set<Role> updatedRoles = roles.stream().map(role -> {
				Role r = new Role();
				String roleName = role.getRoleName().toUpperCase();
				r.setRoleName(roleName.equals("ADMIN") ? "ADMIN" : "USER");
				return r;
			}).collect(Collectors.toSet());
			user.setRole(updatedRoles);
		}

		userRepo.save(user);
		return ResponseEntity.ok("User registered successfully");
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
		logger.info("Login attempt for user: {}", request.getUserName());

		try {
			Authentication auth = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));

			logger.info("Authentication successful for user: {}", request.getUserName());

			UserDetails userDetails = (UserDetails) auth.getPrincipal();
			String token = jwtUtil.generateToken(userDetails);

			Set<String> roles = userDetails.getAuthorities().stream().map(authority -> authority.getAuthority())
					.collect(Collectors.toSet());

			logger.debug("Generated JWT token: {}", token);
			logger.debug("User roles: {}", roles);

			return ResponseEntity.ok(new AuthResponse(token, roles));
		} catch (Exception ex) {
			logger.error("Authentication failed for user: {} - {}", request.getUserName(), ex.getMessage());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

	@GetMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Users>> getAllUsers(Authentication authentication) {
		System.out.println("authentication : " + authentication);
		return ResponseEntity.ok(userRepo.findAll());
	}

	@PutMapping("/update-role/{userId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> updateUserRole(@PathVariable("userId") int userId,
			@RequestBody Map<String, String> requestBody) {
		// Extract new role from request
		String newRoleName = requestBody.get("role"); // Expected: "ADMIN" or "USER"

		if (newRoleName == null || newRoleName.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Role must be provided");
		}

		// Fetch the user from DB
		Optional<Users> optionalUser = userRepo.findById(userId);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}

		Users user = optionalUser.get();

		// Normalize and set the role
		String normalizedRole = newRoleName.trim().toUpperCase();

		// Create a new Role object (this assumes Role is not tied to a separate table
		// requiring lookup)
		Role updatedRole = new Role();
		updatedRole.setRoleName(normalizedRole);

		// ✅ Use a mutable Set instead of Set.of()
		Set<Role> newRoleSet = new HashSet<>();
		newRoleSet.add(updatedRole);

		user.setRole(newRoleSet);

		// Save updated user to DB
		userRepo.save(user);

		return ResponseEntity.ok("User role updated to " + normalizedRole);
	}

	// In AuthController.java
	@GetMapping("/profile")
	public ResponseEntity<UserProfileDto> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
		Users user = userRepo.findByUserName(userDetails.getUsername()).orElseThrow();

		Set<String> roles = user.getRole().stream().map(role -> "ROLE_" + role.getRoleName().toUpperCase())
				.collect(Collectors.toSet());

		UserProfileDto profile = new UserProfileDto(user.getUserName(), roles, user.isEnabled());

		return ResponseEntity.ok(profile);
	}

}
