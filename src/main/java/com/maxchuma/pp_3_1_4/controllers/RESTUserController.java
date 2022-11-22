package com.maxchuma.pp_3_1_4.controllers;

import com.maxchuma.pp_3_1_4.models.User;
import com.maxchuma.pp_3_1_4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class RESTUserController {
    private final UserService userService;

    @Autowired
    public RESTUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public User getUser(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return user;
    }
}
