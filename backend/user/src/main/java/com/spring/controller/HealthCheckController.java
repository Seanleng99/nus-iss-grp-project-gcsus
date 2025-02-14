package com.spring.controller;

import org.springframework.http.ResponseEntity;

@RestController
public class HealthCheckController {

    @GetMapping("/")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Healthy");
    }
}

