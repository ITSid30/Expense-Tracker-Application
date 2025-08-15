import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import moment from 'moment';
import { ExpenseService } from '../../services/expense-service.service';
import { Category, Expense } from '../../models';

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.css']
})
export class ViewSummaryComponent implements OnInit {
  public expensesList: Expense[] = [];
  public totalSpends = 0;
  public maximumAmount = 0;
  public minimumAmount = 999999999;
  public noOfExpenses = 0;

  categorySpends: { [key: string]: number } = {};
  topCategories: Category[] = [];
  chartData: any[] = [];

  lineChartOptions: EChartsOption = {};
  allExpenses: any[] = [];
  selectedMonth: string = '';
  lastFourMonths: any[] = [];

  constructor(
    private expenseService: ExpenseService,
  ) {}

  ngOnInit() {
    this.fetchExpensesFromBackend();
    this.calculateSummary();
    this.lastFourMonths = this.getLastNMonths(4);
    this.getTopCategories();
  }

  calculateSummary() {
    // Calculate total spends
    this.totalSpends = this.expensesList.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate spends by category
    this.expensesList.forEach((expense) => {
      if (this.categorySpends[expense.type]) {
        this.categorySpends[expense.type] += expense.amount;
      } else {
        this.categorySpends[expense.type] = expense.amount;
      }
    });

    // Prepare chart data
    this.chartData = Object.entries(this.categorySpends).map(([type, amount]) => ({
      name: type,
      value: amount,
    }));
  }

  getLastNMonths(n: number): any {
    this.lastFourMonths = Array.from({ length: 4 }, (_, i) => {
      const m = moment().subtract(3 - i, 'months');
      return {
        label: m.format('MMMM YYYY'), // Display: "June 2025"
        value: m.format('YYYY-MM')    // Internal: "2025-06"
      };
    });

    this.selectedMonth = this.lastFourMonths[3].value;
    return this.lastFourMonths;
  }

  fetchExpensesFromBackend() {
    this.expenseService.getExpenses().subscribe(res => {
      this.expensesList = res;
      this.expensesList.forEach(exp => {
          const date = Number(exp.date) * 1000;
          exp.date = new Date(date);
          this.totalSpends += exp.amount;
          this.maximumAmount = Math.max(this.maximumAmount, exp.amount);
          this.minimumAmount = Math.min(this.minimumAmount, exp.amount);
        });
      this.noOfExpenses = this.expensesList.length;
      this.updateChart();
    });

  }

  updateChart() {
    const selected = moment(this.selectedMonth, 'YYYY-MM');
    const daysInMonth = selected.daysInMonth();
    const xAxisDays = Array.from({ length: daysInMonth }, (_, i) =>
      selected.clone().date(i + 1).format('DD')
    );

    const dailyTotals = new Array(daysInMonth).fill(0);

    this.expensesList.forEach(exp => {
      const date = moment(exp.date);
      if (date.format('YYYY-MM') === selected.format('YYYY-MM')) {
        const dayIndex = date.date() - 1;
        dailyTotals[dayIndex] += exp.amount;
      }
    });

    this.lineChartOptions = {
      title: { text: `Expenses for ${selected.format('MMMM YYYY')}` },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: xAxisDays,
        name: 'Day'
      },
      yAxis: {
        type: 'value',
        name: 'Amount (₹)'
      },
      series: [{
        data: dailyTotals,
        type: 'line',
        smooth: false,
        areaStyle: {},
        lineStyle: {
          color: '#FF5733', // 🔴 Custom line color
          width: 3
        },
        itemStyle: {
          color: '#FF5733' // 🔴 Dot color
        }
      }]
    };
  }

  private getTopCategories(): void {
    this.expenseService.getTopCategories().subscribe(res => {
      this.topCategories = res;
    });
  }
  
}