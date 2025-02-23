package com.application.expense.services;

import java.util.List;

import com.application.expense.entities.Expense;

public interface ExpenseService {
	
	public List<Expense> getAllExpenses();
	
	public Expense getExpense(long id);
	
	public Expense addExpense(Expense newExpense);
	
	public Expense updateExpense(Expense expense);
	
	public boolean deleteExpense(long expenseId);
	
	public List<Expense> getRecentExpenses();
	
	public List<Expense> getSortedExpenses(String sortBy, int sortDirection);
}
