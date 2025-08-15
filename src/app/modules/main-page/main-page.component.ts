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
  public displayLimit: number = 5;
  public userDetails: any;
  public expenseStats: any;

  ngOnInit(): void {
      this.getRecentExpenses();
      this.getUserDetails();
      this.getExpenseStats();
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
            this.getRecentExpenses();
            this.getExpenseStats();
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
    }, (error)=> {
      console.error(error);
    });
  }

  private getUserDetails(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    console.log(this.userDetails);
  }

  private getExpenseStats(): void {
    this.expenseService.getExpenseStats().subscribe(res => {
      this.expenseStats = res;
    }, (error) => {
      console.error(error);
    })
  }
}
