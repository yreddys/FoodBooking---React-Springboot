package com.hotel.payload;

public class ResetPasswordRequest {

	private String otp;
	private String newPassword;

	public ResetPasswordRequest() {
	}

	public ResetPasswordRequest(String otp, String newPassword) {
		this.otp = otp;
		this.newPassword = newPassword;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
}
