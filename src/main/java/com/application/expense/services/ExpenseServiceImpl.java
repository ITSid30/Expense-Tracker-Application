package com.application.expense.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import com.application.expense.dao.ExpenseDao;
import com.application.expense.dao.UserRepository;
import com.application.expense.dto.ExpenseStatsDTO;
import com.application.expense.dto.TopCategoryDTO;
import com.application.expense.entities.Expense;
import com.application.expense.entities.User;

@Service
public class ExpenseServiceImpl implements ExpenseService {
	
	@Autowired
	public ExpenseDao expenseDao;
	@Autowired private UserRepository userRepository;

	@Override
	public List<Expense> getAllExpenses() {
		// TODO Auto-generated method stub
		return this.expenseDao.findAll();
	}
	

	@Override
	public Expense getExpense(long id) {
		// TODO Auto-generated method stub
		return this.expenseDao.findById(id).orElse(null);
	}

	@Override
	public Expense addExpense(Expense newExpense) {
		// TODO Auto-generated method stub
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
	    
	    // Fetch the user entity from DB
	    User user = userRepository.findByUserName(username)
	        .orElseThrow(() -> new RuntimeException("User not found"));
	    
	    // Set the user in the expense
	    newExpense.setUser(user);
	    
		return this.expenseDao.save(newExpense);
	}

	@Override
	public Expense updateExpense(Expense expense) {
		// TODO Auto-generated method stub
		Expense existingExp = this.expenseDao.findById(expense.getId()).orElse(null);
		if(existingExp != null) {
			existingExp.setDescription(expense.getDescription());;
			existingExp.setType(expense.getType());
			existingExp.setAmount(expense.getAmount());
			existingExp.setDate(expense.getDate());
			return this.expenseDao.save(existingExp);  // it saves new data and returns that data
		} else {
			return null;
		}
	}

	@Override
	public boolean deleteExpense(long expenseId) {
		// TODO Auto-generated method stub
		if(expenseDao.existsById(expenseId)) {
			this.expenseDao.deleteById(expenseId);
			return true;
		} else return false;
	}

	@Override
	public List<Expense> getRecentExpenses(Long userId) {
		// TODO Auto-generated method stub
		return this.expenseDao.findByUserIdOrderByDateDesc(userId);
	}

	@Override
	public List<Expense> getSortedExpenses(String sortBy, int sortDirection) {
	    Sort.Direction direction = sortDirection == 1 ? Sort.Direction.ASC : Sort.Direction.DESC;
	    Sort sort = Sort.by(direction, sortBy);
	    return this.expenseDao.findAll(sort);
	}

	@Override
	public List<Object[]> getTopCategories() {
		// TODO Auto-generated method stub
		
		return this.expenseDao.getTopCategories();
	}

	@Override
	public ExpenseStatsDTO getExpenseStats() {
		// TODO Auto-generated method stub
		Object[] statsObj = (Object[]) this.expenseDao.getTotalExpensesAndAmount();
		
		long totalExpenses = ((Number) statsObj[0]).longValue();
		double totalAmount = ((Number) statsObj[1]).doubleValue();
		
		return new ExpenseStatsDTO(totalExpenses, totalAmount);
	}

	
}
