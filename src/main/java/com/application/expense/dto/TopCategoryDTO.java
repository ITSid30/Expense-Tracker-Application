package com.application.expense.dto;

public class TopCategoryDTO {
    private String category;
    private double totalAmount;

    public TopCategoryDTO(String category, double totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }

    public String getCategory() {
        return category;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
