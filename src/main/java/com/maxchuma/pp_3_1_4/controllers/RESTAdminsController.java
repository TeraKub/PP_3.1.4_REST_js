package com.maxchuma.pp_3_1_4.controllers;

import com.maxchuma.pp_3_1_4.exception_handing.NoSuchUserException;
import com.maxchuma.pp_3_1_4.models.User;
import com.maxchuma.pp_3_1_4.services.RoleService;
import com.maxchuma.pp_3_1_4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RESTAdminsController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RESTAdminsController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> allUsers = userService.allUsers();
        return allUsers;
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable("id") int id) {
        Optional<User> user= userService.getUserById(id);
        if(user.isEmpty()) {
            throw new NoSuchUserException(String.format("There is no user with ID = %d in Database", id));
        }
        return user;
    }

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        userService.saveNewUser(user);
        return user;
    }

    @PutMapping("/users")
    public User editUser(@RequestBody User user) {
        userService.saveEditUser(user);
        return user;
    }

}
