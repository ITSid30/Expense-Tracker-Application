package com.application.expense.utility;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.application.expense.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Key;

@Component
public class JwtUtil {
	Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // generates a 256-bit key
	
	public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", user.getId());
		claims.put("fullName", user.getFullName());
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(user.getUserName())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // valid for 1 hour
				.signWith(SECRET_KEY)
				.compact();
	}
	
	public String extractUsername(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY)
				.parseClaimsJws(token).getBody().getSubject();
	}
	
	public Long extractUserId(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
		return claims.get("userId", Long.class);
	}
	
	public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
	
	private boolean isTokenExpired(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY)
				.parseClaimsJws(token).getBody().getExpiration().before(new Date());
	}
	
	// to getUserId from the request given to API call
	public Long extractUserIdFromRequest(HttpServletRequest request) throws Exception {
		String header = request.getHeader("Authorization");
		if(header == null || !header.startsWith("Bearer ")) {
			throw new Exception("Missing or invalid Authorization header");
		}
		
		String token = header.substring(7);
		if(isTokenExpired(token)) {
			throw new Exception("Token is expired");
		}
		
		return extractUserId(token);
	}
}
