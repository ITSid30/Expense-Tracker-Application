package com.application.expense.dao;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.application.expense.dto.TopCategoryDTO;
import com.application.expense.entities.Expense;

public interface ExpenseDao extends JpaRepository<Expense, Long> {

	List<Expense> findByOrderByDateDesc();
	
	List<Expense> findAll(Sort sort);
	
	@Query("SELECT e.type, SUM(e.amount) FROM Expense e GROUP BY e.type ORDER BY SUM(e.amount) DESC")
	List<Object[]> getTopCategories();
}
