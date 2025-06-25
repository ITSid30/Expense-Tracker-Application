import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExpensesComponent } from '../modules/add-expenses/add-expenses.component';
import { Expense } from '../models';
import { ExpenseService } from '../services/expense-service.service';
import moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  // public expensesList: Expense[] = [
  //   { id: 1, description: 'Grocery Shopping', amount: 150, type: 'Food', date: new Date() },
  //   { id: 2, description: 'Electricity Bill', amount: 200, type: 'Utilities', date: new Date() },
  //   { id: 3, description: 'Gym Membership', amount: 100, type: 'Health', date: new Date() },
  //   { id: 4, description: 'Online Shopping', amount: 300, type: 'Entertainment', date: new Date() },
  // ];
  public expensesList: Expense[] = [];
  public recentExpenseList: Expense[] = [];
  public displayLimit: number = 3;
  public isCollapsed: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
      this.getRecentExpenses();
  }

  public toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    document.querySelector('.container')?.classList.toggle('sidebar-collapsed');
    document.querySelector('.sidebar')?.classList.toggle('collapsed');
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
        this.expensesList.push(res.data);
      }
    });

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
