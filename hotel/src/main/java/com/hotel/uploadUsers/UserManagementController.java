package com.hotel.uploadUsers;

import java.io.InputStream;

import java.util.Set;
import java.util.UUID;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.email.EmailService;
import com.hotel.entity.Role;
import com.hotel.entity.Users;
import com.hotel.repository.UserRepo;

@RestController
@RequestMapping("/api/user-management")
@CrossOrigin
public class UserManagementController {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder encoder;

	/**
	 * ✅ Upload Users via Excel
	 */
	@PostMapping("/upload-users")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> uploadUsersFromExcel(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("Excel file is empty.");
		}

		try (InputStream inputStream = file.getInputStream()) {
			Workbook workbook = new XSSFWorkbook(inputStream);
			Sheet sheet = workbook.getSheetAt(0);

			for (Row row : sheet) {
				if (row.getRowNum() == 0)
					continue; // Skip header

				Cell emailCell = row.getCell(0);
				if (emailCell == null)
					continue;

				String email = emailCell.getStringCellValue().trim();

				if (email.isEmpty() || userRepo.findByUserName(email).isPresent()) {
					continue; // skip empty or already registered
				}

				String tempPassword = UUID.randomUUID().toString().substring(0, 8);

				Users user = new Users();
				user.setUserName(email);
				user.setPassword(encoder.encode(tempPassword));
				user.setEnabled(true); // direct enable (if trusted source)
				user.setForcePasswordChange(true);
				user.setRole(Set.of(new Role(0, "USER")));

				userRepo.save(user);

				// ✅ Send temp password to user
				emailService.sendTemporaryPasswordEmail(email, tempPassword);
			}

			workbook.close();
			return ResponseEntity.ok("Users uploaded and temporary passwords sent via email.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process Excel file.");
		}
	}

	/**
	 * ✅ Change Password (after login)
	 */
	@PostMapping("/change-password")

	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
		String userName = request.getUserName();
		String oldPassword = request.getOldPassword();
		String newPassword = request.getNewPassword();

		if (userName == null || oldPassword == null || newPassword == null) {
			return ResponseEntity.badRequest().body("All fields are required.");
		}

		Users user = userRepo.findByUserName(userName).orElse(null);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}

		if (!encoder.matches(oldPassword, user.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old password is incorrect.");
		}

		user.setPassword(encoder.encode(newPassword));
		user.setForcePasswordChange(false); // ✅ Unset the flag
		userRepo.save(user);

		return ResponseEntity.ok("Password changed successfully. Please login again.");
	}

}
