package com.hotel.repository;

import com.hotel.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
	Optional<Users> findByUserName(String userName);

}
