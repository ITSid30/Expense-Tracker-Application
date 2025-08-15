import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllExpensesComponent } from './modules/all-expenses/all-expenses.component';
import { ViewSummaryComponent } from './modules/view-summary/view-summary.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'expenses',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: MainPageComponent,
      },
      {
        path: 'all-expenses', component: AllExpensesComponent,
      }, 
      {
        path: 'view-summary', component: ViewSummaryComponent,
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
