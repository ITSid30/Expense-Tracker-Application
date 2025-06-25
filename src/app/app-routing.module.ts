import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllExpensesComponent } from './modules/all-expenses/all-expenses.component';
import { ViewSummaryComponent } from './modules/view-summary/view-summary.component';
import { MainPageComponent } from './modules/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'all-expenses', component: AllExpensesComponent },
  { path: 'view-summary', component: ViewSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
