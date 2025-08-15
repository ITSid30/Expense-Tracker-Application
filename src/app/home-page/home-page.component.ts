import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExpensesComponent } from '../modules/add-expenses/add-expenses.component';
import { Expense } from '../models';
import { ExpenseService } from '../services/expense-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public expensesList: Expense[] = [];
  public recentExpenseList: Expense[] = [];
  public displayLimit: number = 3;
  public isCollapsed: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private expenseService: ExpenseService,
    private authService: AuthServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
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

  public onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
