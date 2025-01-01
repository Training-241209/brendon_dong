package com.revature.bdong_ers.Controllers;

import com.revature.bdong_ers.DTOs.UserLoginDTO;
import com.revature.bdong_ers.DTOs.ReimbursementStatusDTO;
import com.revature.bdong_ers.DTOs.UserIdDTO;
import com.revature.bdong_ers.DTOs.UserResponseDTO;
import com.revature.bdong_ers.Entities.Reimbursement;
import com.revature.bdong_ers.Entities.User;
import com.revature.bdong_ers.Services.AuthService;
import com.revature.bdong_ers.Services.ReimbursementService;
import com.revature.bdong_ers.Services.UserService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class AuthController {

    public static final String AUTH_HEADER_NAME = "authorization";

    private ReimbursementService reimbursementService;
    private UserService userService;
    private AuthService authService;

    @Autowired
    public AuthController(ReimbursementService reimbursementService, UserService userService, AuthService authService) {
        this.reimbursementService = reimbursementService;
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping(value="/ping")
    public ResponseEntity<String> ping() {
        System.out.println("Ping pong!");
        return ResponseEntity.ok().body("Pong!");
    }

    @GetMapping(value="/id")
    public ResponseEntity<UserIdDTO> getId(@RequestHeader("Authorization") String token) {
        int id = authService.getTokenId(token);
        return ResponseEntity.ok().body(new UserIdDTO(id));
    }

    @Transactional
    @PostMapping(value="/register")
    public ResponseEntity<UserIdDTO> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerAccount(user);
        String token = authService.generateToken(registeredUser);
        HttpHeaders headers = createHttpAuthHeaders(token);
        return ResponseEntity.ok().headers(headers).body(new UserIdDTO(registeredUser));
    }

    @PostMapping(value="/login")
    public ResponseEntity<UserResponseDTO> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        User validUser = userService.loginAccount(userLoginDTO);
        HttpHeaders headers = null;
        UserResponseDTO response = null;
        if (validUser != null) {
            String token = authService.generateToken(validUser);
            response = new UserResponseDTO(validUser);
            headers = createHttpAuthHeaders(token);
        }
        return ResponseEntity.ok().headers(headers).body(response);
    }

    private HttpHeaders createHttpAuthHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(AUTH_HEADER_NAME, token);
        httpHeaders.setAccessControlExposeHeaders(Collections.singletonList(AUTH_HEADER_NAME));
        return httpHeaders;
    }
}
