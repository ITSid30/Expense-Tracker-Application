import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.css']
})
export class ViewSummaryComponent implements OnInit {
  expensesList = [
    { expenseId: 1, expenseDescription: 'Grocery Shopping', expenseAmount: 150, expenseType: 'Food', date: new Date() },
    { expenseId: 2, expenseDescription: 'Electricity Bill', expenseAmount: 500, expenseType: 'Utilities', date: new Date() },
    { expenseId: 3, expenseDescription: 'Movie Tickets', expenseAmount: 300, expenseType: 'Entertainment', date: new Date() },
    { expenseId: 4, expenseDescription: 'Dinner', expenseAmount: 250, expenseType: 'Food', date: new Date() },
    { expenseId: 5, expenseDescription: 'Phone Bill', expenseAmount: 400, expenseType: 'Utilities', date: new Date() },
  ];

  totalSpends = 0;
  categorySpends: { [key: string]: number } = {};
  topCategories: { type: string; amount: number }[] = [];
  chartData: any[] = [];

  ngOnInit() {
    this.calculateSummary();
  }

  calculateSummary() {
    // Calculate total spends
    this.totalSpends = this.expensesList.reduce((sum, expense) => sum + expense.expenseAmount, 0);

    // Calculate spends by category
    this.expensesList.forEach((expense) => {
      if (this.categorySpends[expense.expenseType]) {
        this.categorySpends[expense.expenseType] += expense.expenseAmount;
      } else {
        this.categorySpends[expense.expenseType] = expense.expenseAmount;
      }
    });

    // Prepare top categories
    this.topCategories = Object.entries(this.categorySpends)
      .map(([type, amount]) => ({ type, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    // Prepare chart data
    this.chartData = Object.entries(this.categorySpends).map(([type, amount]) => ({
      name: type,
      value: amount,
    }));
  }
}