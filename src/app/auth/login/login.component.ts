import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginData = {
    username: '',
    password: '',
  };
  public showPassword: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  public onLogin(): void {
    if(!this.loginData.username || !this.loginData.password) {
      this.snackbarService.openSnackbar('Please Enter UserName or Password', 'error');
    }

    this.authService.login(this.loginData).subscribe(res => {
      if(res) {
        const token = res.token;
        this.authService.saveToken(token);
        const userDetails = {
          'userName': res.username,
          'userId': res.userId,
          'fullName': res.fullName,
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        this.snackbarService.openSnackbar('User Logged in Successfully.', 'success');
        this.router.navigate(['/expenses']);
      }
    }, (error) => {
      console.error(error);
      this.snackbarService.openSnackbar('Failed to Login', 'error');
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
