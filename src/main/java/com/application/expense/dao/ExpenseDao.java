package com.application.expense.dao;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.application.expense.entities.Expense;

public interface ExpenseDao extends JpaRepository<Expense, Long> {

	List<Expense> findByOrderByDateDesc();
	
//	@Query("SELECT e from Expense e ORDER BY" + 
//			"CASE WHEN :sortBy = 'description' AND :sortDirection = 1 THEN e.description END ASC, " +
//			"CASE WHEN :sortBy = 'description' AND :sortDirection = 2 THEN e.description END DESC, " +
//			"CASE WHEN :sortBy = 'type' AND :sortDirection = 1 THEN e.type END ASC, " +
//			"CASE WHEN :sortBy = 'type' AND :sortDirection = 2 THEN e.type END DESC, " +
//			"CASE WHEN :sortBy = 'amount' AND :sortDirection = 1 THEN e.amount END ASC, " +
//			"CASE WHEN :sortBy = 'amount' AND :sortDirection = 2 THEN e.amount END DESC, " +
//			"CASE WHEN :sortBy = 'date' AND :sortDirection = 1 THEN e.date END ASC, " +
//			"CASE WHEN :sortBy = 'date' AND :sortDirection = 2 THEN e.date END DESC, ")
//	List<Expense> getSortedExpenses(String sortBy, String sortDirection);
	
//	@Query("SELECT e FROM Expense e")
//	List<Expense> getSortedExpenses(Sort sort);
	
	List<Expense> findAll(Sort sort);
}
