package com.application.expense.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.application.expense.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserNameOrMobileNumber(String userName, String mobileNumber);

	Optional<User> findByUserName(String userName);
	
	List<User> findAll();
	
	boolean existsByUserName(String userName);
	boolean existsByMobileNumber(String mobileNumber);
}
