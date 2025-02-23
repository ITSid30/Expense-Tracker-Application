import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service.service';
import { Expense, Sort } from '../../models';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrl: './all-expenses.component.css'
})
export class AllExpensesComponent implements OnInit {

  public expenseList: Expense[] = [];
  public sortTypes: Sort[] = [
    {name: 'Name ASC', value: 'description', type: 1 },
    {name: 'Name DESC', value: 'description', type: 2 },
    {name: 'Amount ASC', value: 'amount', type: 1 },
    {name: 'Amount DESC', value: 'amount', type: 2 },
    {name: 'Type ASC', value: 'type', type: 1 },
    {name: 'Type DESC', value: 'type', type: 2 },
    {name: 'Date ASC', value: 'date', type: 1 },
    {name: 'Date DESC', value: 'date', type: 2 },
  ];
  public selectSort: Sort = this.sortTypes[0];

  constructor(
    private expenseService: ExpenseService,

  ) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  private getExpenses(): void {
    this.expenseService.getSortedExpenses(this.selectSort).subscribe(res => {
      if (res) {
        this.expenseList = res;
        this.expenseList.forEach(exp => {
          const date = Number(exp.date) * 1000;
          exp.date = new Date(date);
        });
      }
    })
  }

  public sortChanged(): void {
    this.getExpenses();
  }
}
