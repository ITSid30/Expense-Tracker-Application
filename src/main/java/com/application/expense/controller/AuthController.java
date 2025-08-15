package com.application.expense.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.expense.dao.UserRepository;
import com.application.expense.entities.RegisterRequest;
import com.application.expense.entities.User;
import com.application.expense.utility.JwtUtil;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired private UserRepository userRepository;
	@Autowired private PasswordEncoder passwordEncoder;
	@Autowired private AuthenticationManager authenticationManager;
	@Autowired private JwtUtil jwtUtil;
	
	// Rooot User Login:
	// UserName: Siddhesh , MobileNumber: 9999999999, Password: Sid123
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
		List<User> users = userRepository.findAll();
		return ResponseEntity.ok(users);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
		// check if userName exists already
		if(userRepository.existsByUserName(request.getUserName())) {
			return ResponseEntity.badRequest().body("Error: Username is already taken!");
		}
		// check if MobileNumber exists already
		if(userRepository.existsByMobileNumber(request.getMobileNumber())) {
			return ResponseEntity.badRequest().body("Error: Mobile Number already in use!");
		}
		
		// Save user 
		User user = new User();
		user.setFullName(request.getFullName());
		user.setMobileNumber(request.getMobileNumber());
		user.setUserName(request.getUserName());		
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		userRepository.save(user);
		return ResponseEntity.ok("User Registered successfully");
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
		String input = loginRequest.get("username");
		String password = loginRequest.get("password");
		
		Optional<User> userOpt = userRepository.findByUserNameOrMobileNumber(input, input);
		if(userOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		}
		
		User user = userOpt.get();
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(user.getUserName(),  password)
			);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
		}
		
		String token = jwtUtil.generateToken(user);
		return ResponseEntity.ok(Map.of("token", token, "username", user.getUserName(), "fullName", user.getFullName(), "userId", user.getId()));
	}
}
