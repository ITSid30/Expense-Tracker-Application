import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  public openSnackbar(message: string, type: string): void {
    this.snackBar.open(message, type === 'success' ? 'Close' : 'Retry', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  //// Not working
  // public openSnackbar(message: string, type: string): void {
  //   if (type === 'success') {
  //     this.toastr.success(message, 'Success', {
  //       toastClass: 'ngx-toastr success-toast',
  //     });
  //   } else if (type === 'error') {
  //     this.toastr.error(message, 'Error', {
  //       toastClass: 'ngx-toastr error-toast',
  //     });
  //   }
  // }
}
