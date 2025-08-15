import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  // LoginStatusSubjects to let App Know that login is happened
  private loginStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  public hasToken(): boolean {
    const token = localStorage.getItem('appToken');
    const loginTime = localStorage.getItem('loginTime');

    if(token && loginTime) {
      const currentTime = Date.now();
      const loginTimeStamp = parseInt(loginTime, 10);
      const oneHour = 60 * 60 * 1000;

      if((currentTime - loginTimeStamp) > oneHour) {
        this.logout();
        return false;
      }

      return true;
    }
    return false; // if no token and loginTime registered
  }

  public login(credentials: { username: string, password: string}): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }
  
  public saveToken(token: string): void {
    localStorage.setItem('loginTime', JSON.stringify(Date.now()));
    localStorage.setItem('appToken', token);
    this.loginStatusSubject.next(true);
  }

  public getToken() {
    return localStorage.getItem('appToken');
  }

  public logout(): void {
    localStorage.removeItem('appToken');
    localStorage.removeItem('userDetails');
    this.loginStatusSubject.next(false);
  }

  public resgisterUser(registData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, registData);
  }
}
