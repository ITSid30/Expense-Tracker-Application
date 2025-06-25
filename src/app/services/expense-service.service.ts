import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense, Sort } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private userUrl: string = '';

  constructor(
    private httpClient: HttpClient
  ) { 
    this.userUrl = 'http://localhost:8080/expenses';
  }

  public getExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.userUrl);
  } 

  public getSingleExpense(expId: number): Observable<Expense> {
    return this.httpClient.get<Expense>(this.userUrl + `/${expId}`);
  }

  public addExpense(newExpense: any): Observable<Expense> {
    return this.httpClient.post<Expense>(this.userUrl, newExpense);
  }

  public updateExpense(existingExp: Expense): Observable<Expense> {
    return this.httpClient.put<Expense>(this.userUrl, existingExp);
  }

  public deleteExpense(expId: number): Observable<any> {
    return this.httpClient.delete(this.userUrl+ `/${expId}`);
  }

  public getRecentExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.userUrl + '/recent');
  }

  public getSortedExpenses(sort: Sort): Observable<Expense[]> {
    let params = new HttpParams()
      .set('sortBy', sort.value).set('sortDirection', sort.type);

    return this.httpClient.get<Expense[]>(this.userUrl + '/sorted', { params });
  }

  public getTopCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.userUrl + '/top-categories');
  }
}
