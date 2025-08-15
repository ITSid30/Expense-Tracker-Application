import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}

  public title = 'ExpenseTracker';
  public isUserLoggedIn: boolean = false;

  ngOnInit(): void {
    // this.getLoginStatus();
    this.authService.loginStatus$.subscribe(status => {
      this.isUserLoggedIn = status;
    }, (error) => {
      this.snackbarService.openSnackbar('Logged Out of System', 'error');
      this.router.navigate(['/login']);
    });
  }

  private getLoginStatus(): void {
    this.authService.loginStatus$.subscribe(status => {
      this.isUserLoggedIn = status;
      if(this.isUserLoggedIn == false) {
        this.authService.logout();
      }
    });
  }
}
