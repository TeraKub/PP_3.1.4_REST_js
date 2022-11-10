package com.maxchuma.pp_3_1_4.services;

import com.maxchuma.pp_3_1_4.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

// UserDetailsService предоставляет юзера по имени пользователя
public interface UserService extends UserDetailsService {
    User findByUsername(String username);
    List<User> allUsers();
    boolean saveNewUser(User user);
    void saveEditUser(User user);
    void saveEditUser(User user, int id);
//    User getUserById(int id);
    Optional<User> getUserById(int id);
    void delete(int id);
}
