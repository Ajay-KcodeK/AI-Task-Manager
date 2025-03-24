package com.taskmanager.controller;

import com.taskmanager.model.User;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())){
            String token = jwtUtil.generateToken(user.getEmail());
            Long userId = existingUser.get().getId();
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", userId);
            response.put("role", existingUser.get().getRole());
            return ResponseEntity.ok(response);

        }else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}
