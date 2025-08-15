package com.application.expense.dto;

public class ExpenseStatsDTO {
    
	private long totalExpenses;     // count of expenses
    private double totalAmount;     // sum of all amounts

    public ExpenseStatsDTO(long totalExpenses, double totalAmount) {
        this.totalExpenses = totalExpenses;
        this.totalAmount = totalAmount;
    }

	public long getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(long totalExpenses) {
		this.totalExpenses = totalExpenses;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

}