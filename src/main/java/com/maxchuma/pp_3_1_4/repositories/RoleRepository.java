package com.maxchuma.pp_3_1_4.repositories;

import com.maxchuma.pp_3_1_4.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
