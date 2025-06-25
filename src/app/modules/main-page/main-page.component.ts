import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { AddExpensesComponent } from '../add-expenses/add-expenses.component';
import { ExpenseService } from '../../services/expense-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private expenseService: ExpenseService,
  ) {}

  public recentExpenseList: Expense[] = [];
  // public expensesList: Expense[] = [
  //   { id: 1, description: 'Grocery Shopping', amount: 150, type: 'Food', date: new Date() },
  //   { id: 2, description: 'Electricity Bill', amount: 200, type: 'Utilities', date: new Date() },
  //   { id: 3, description: 'Gym Membership', amount: 100, type: 'Health', date: new Date() },
  //   { id: 4, description: 'Online Shopping', amount: 300, type: 'Entertainment', date: new Date() },
  // ];
  public displayLimit: number = 5;

  ngOnInit(): void {
      this.getRecentExpenses();
  }

  public addExpenses(): void {
    const dialog = this.matDialog.open(AddExpensesComponent, {
          width: '800px',
          height: '600px',
          disableClose: false, // Optional: Prevent closing dialog on click outside
          data: {
            data: 'new'
          }
        });
    
        dialog.afterClosed().subscribe(res => {
          if(res.action == 'Save') {
            // this.expensesList.push(res.data);
          }
        });
  }

  public viewAllExpenses(): void {

  }

  public getRecentExpenses(): void {
    this.expenseService.getRecentExpenses().subscribe(res => {
      if (res) {
        this.recentExpenseList = res;
        this.recentExpenseList.forEach(exp => {
          const date = Number(exp.date) * 1000;
          exp.date = new Date(date);
        });
      }
    });
  }
}
