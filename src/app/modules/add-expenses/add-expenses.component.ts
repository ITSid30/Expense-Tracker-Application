import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../../models';
import { ExpenseService } from '../../services/expense-service.service';
import { SnackbarService } from '../../services/snackbar.service';
import moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent implements OnInit {

  @Output() public expenseData = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<AddExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private expenseService: ExpenseService,
      private snackbarService: SnackbarService,
      private datePipe: DatePipe
  ) { }

  public expenseForm!: FormGroup;
  public expenseTypes: string[] = ['Travel', 'Shopping', 'Friends and Family', 'Utilities', 'Recharges'];
  public expenseDateFormatted: string = '';

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      id: new FormControl('', [Validators.required]),
      expenseDescription: new FormControl('', [Validators.required]),
      expenseAmount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]),
      expenseType: new FormControl('', [Validators.required]),
      expenseDate: new FormControl(''),
    });
  }

  onSave(): void {
    console.log(this.expenseForm.value);
    let formData = this.expenseForm.value;
    const expenseObject = {
      id: formData.id,
      description: formData.expenseDescription,
      amount: formData.expenseAmount,
      type: formData.expenseType,
      date: moment(formData.expenseDate).unix(),
    };
    this.expenseService.addExpense(expenseObject).subscribe(res => {
      if(res) {
        this.snackbarService.openSnackbar('Expense Added successfully.', 'success');
        this.dialogRef.close();
      }
    }, (error) => {
      this.snackbarService.openSnackbar('Unable to add Expense', 'error');
      return;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // onDateChange(event: any) {
  //   const inputDate = event.target.value;
  //   if (inputDate) {
  //     const formattedDate = this.datePipe.transform(inputDate, 'dd/MM/yyyy');
  //     if (formattedDate) {
  //       this.expenseDateFormatted = formattedDate;
  //     }
  //   }
  // }

}
