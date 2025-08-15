import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  public registerForm!: FormGroup;
  public showPassword: boolean = false;
  
  constructor(
    private authService: AuthServiceService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
      this.setRegisterForm();
  }

  private setRegisterForm(): void {
    this.registerForm = new FormGroup({
    userName: new FormControl('', [ Validators.required, Validators.maxLength(15) ]),
    fullName: new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
    mobileNumber: new FormControl('', [ Validators.required, Validators.pattern(/^[6-9]\d{9}$/) ]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]),
    confirmPassword: new FormControl('', Validators.required)
  }, {
    validators: this.passwordsMatchValidator
  });
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    const payload = {
      userName: formValue.userName,
      fullName: formValue.fullName,
      mobileNumber:  formValue.mobileNumber,
      password: formValue.password
    };

    this.authService.resgisterUser(payload).subscribe(res => {
      if(res) {
        this.snackbarService.openSnackbar('Registration Successful! Please log in.', 'success');
        this.router.navigate(['/login']);
      }
    },
    (err) => {
      this.snackbarService.openSnackbar('Failed to Register User', 'error');
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
