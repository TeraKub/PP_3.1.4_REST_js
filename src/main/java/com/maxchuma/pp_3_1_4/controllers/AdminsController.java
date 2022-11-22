package com.maxchuma.pp_3_1_4.controllers;

import com.maxchuma.pp_3_1_4.models.User;
import com.maxchuma.pp_3_1_4.services.RoleService;
import com.maxchuma.pp_3_1_4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminsController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminsController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String getAllUsers() { //(Model model, Principal principal) {
//        model.addAttribute("users", userService.allUsers());
//        model.addAttribute("userAttr", userService.findByUsername(principal.getName()));
//        model.addAttribute("user_roles", roleService.listRoles());
//        model.addAttribute("newUser", new User());
        return "admin";
    }

//    @GetMapping("/addNewUser")
//    public String addNewUser(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("user_roles", roleService.listRoles());
//        return "new";
//    }
//
//    @PostMapping()
//    public String saveUser(@ModelAttribute("user") User user) {
//        userService.saveNewUser(user);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/{id}")
//    public String edit(@PathVariable("id") int id, Model model) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("user_roles", roleService.listRoles());
//        return "edit";
//    }
//
//    @PatchMapping("/{id}")
//    public String saveEditUser(@ModelAttribute("user") User user) {
//        userService.saveEditUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/{id}")
//    public String delete(@PathVariable("id") int id) {
//        userService.delete(id);
//        return "redirect:/admin";
//    }
}
