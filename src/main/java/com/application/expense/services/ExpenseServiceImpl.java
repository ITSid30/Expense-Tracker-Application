package com.application.expense.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.application.expense.dao.ExpenseDao;
import com.application.expense.entities.Expense;

@Service
public class ExpenseServiceImpl implements ExpenseService {
	
	@Autowired
	public ExpenseDao expenseDao;

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
	public List<Expense> getRecentExpenses() {
		// TODO Auto-generated method stub
		return this.expenseDao.findByOrderByDateDesc();
	}

	@Override
	public List<Expense> getSortedExpenses(String sortBy, int sortDirection) {
	    Sort.Direction direction = sortDirection == 1 ? Sort.Direction.ASC : Sort.Direction.DESC;
	    Sort sort = Sort.by(direction, sortBy);
	    return this.expenseDao.findAll(sort);
	}
	
	
	
	
}
