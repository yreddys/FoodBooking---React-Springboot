package com.hotel.payload;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthRequest {
	private String userName;
	private String password;
}
