package com.application.expense.services;

import java.util.List;

import com.application.expense.dto.ExpenseStatsDTO;
import com.application.expense.dto.TopCategoryDTO;
import com.application.expense.entities.Expense;

public interface ExpenseService {
	
	public List<Expense> getAllExpenses();
	
	public Expense getExpense(long id);
	
	public Expense addExpense(Expense newExpense);
	
	public Expense updateExpense(Expense expense);
	
	public boolean deleteExpense(long expenseId);
	
	public List<Expense> getRecentExpenses(Long userId);
	
	public List<Expense> getSortedExpenses(String sortBy, int sortDirection);
	
//	public List<TopCategoryDTO> getTopCategories();
	public List<Object[]> getTopCategories();
	
	public ExpenseStatsDTO getExpenseStats();
}
