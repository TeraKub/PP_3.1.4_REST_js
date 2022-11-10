package com.maxchuma.pp_3_1_4.repositories;

import com.maxchuma.pp_3_1_4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u join fetch u.roles where u.username = :username")
    User filterByUsername(String username);
}
