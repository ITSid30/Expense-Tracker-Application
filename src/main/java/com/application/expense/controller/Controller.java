package com.application.expense.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.expense.dto.TopCategoryDTO;
import com.application.expense.entities.Expense;
import com.application.expense.services.ExpenseService;

@CrossOrigin("*")
@RestController
public class Controller {
	
	@GetMapping("/")
	public String home() {
		return "HI Welcom to Expense Backend";
	}
	
	@Autowired
	private ExpenseService expenseService;
	
	@GetMapping("expenses")
	public ResponseEntity<?> getExpenses() {
		try {
			List<Expense> expenseList = this.expenseService.getAllExpenses();
			return ResponseEntity.ok(expenseList);
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while fetching expenses: " + e.getMessage());
		}
	}
	
	@GetMapping("expenses/{expId}")
	public ResponseEntity<?> getExpense(@PathVariable String expId) {
		try {
			Expense expense = this.expenseService.getExpense(Long.parseLong(expId));
			return ResponseEntity.ok(expense);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while fetching expense: " + e.getMessage());
		}
	}
	
	@PostMapping("expenses")
	public ResponseEntity<?> addExpense(@RequestBody Expense newExp) {
		try {
			Expense expense = this.expenseService.addExpense(newExp);
			return ResponseEntity.ok(expense);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while adding expense: " + e.getMessage());
		}
	}
	
	@PutMapping("expenses")
	public ResponseEntity<?> updateExpense(@RequestBody Expense exp) {
		try {
			Expense expense = this.expenseService.updateExpense(exp);
			return ResponseEntity.ok(expense);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while updating expense: " + e.getMessage());
		}
	}
	
	@DeleteMapping("/expenses/{expId}")
	public ResponseEntity<?> deleteExpense(@PathVariable String expId) {
	    try {
	        boolean isDeleted = this.expenseService.deleteExpense(Long.parseLong(expId));

	        if (isDeleted) {
	            return ResponseEntity.ok("Expense deleted successfully.");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found.");
	        }
	    } catch (NumberFormatException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expense ID format.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("An error occurred while deleting the expense: " + e.getMessage());
	    }
	}
	
	@GetMapping("/expenses/recent")
	public ResponseEntity<?> getRecentExpenses() {
		try {
			List<Expense> expenses = this.expenseService.getRecentExpenses();
			return ResponseEntity.ok(expenses);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while fetching expense: " + e.getMessage());
		}
	}
	
	@GetMapping("/expenses/sorted")
	public ResponseEntity<?> getSortedExpenses(@RequestParam String sortBy, @RequestParam int sortDirection) {
		try {
			List<Expense> expenses = this.expenseService.getSortedExpenses(sortBy, sortDirection);
			return ResponseEntity.ok(expenses);
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while fetching sorted Expenses: " + e.getMessage());
		}
	}
	
	@GetMapping("/expenses/top-categories")
    public ResponseEntity<?> getTopCategories() {
		try {
//			List<TopCategoryDTO> categories = this.expenseService.getTopCategories();
//			return ResponseEntity.ok(categories);
			List<Object[]> rawResult = expenseService.getTopCategories();

	        // Convert Object[] to readable Map<String, Object>
	        List<Map<String, Object>> response = rawResult.stream().map(row -> {
	            Map<String, Object> map = new HashMap<>();
	            map.put("category", row[0]);
	            map.put("totalAmount", row[1]);
	            return map;
	        }).collect(Collectors.toList());
			return ResponseEntity.ok(response);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occured while fetching sorted Expenses: " + e.getMessage());
		}
    }
}