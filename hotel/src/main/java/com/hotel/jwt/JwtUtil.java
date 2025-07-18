package com.hotel.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Data;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Data
public class JwtUtil {

	private final String secretKey = "MySuperSecretKeyForJWTGeneration123456";

	private final long jwtExpiration = 3600000;

	public String generateToken(UserDetails userDetails) {
		return Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256).compact();
	}

	public String extractUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes())).build()
				.parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		String username = extractUsername(token);
		return username.equals(userDetails.getUsername());
	}
}
