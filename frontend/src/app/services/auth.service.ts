import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  id: string;
} 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.api}`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.url}/users/login`, { username, password }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if(response.id){
          localStorage.setItem('userId', response.id);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token'); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token') || !!sessionStorage.getItem('auth_token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken = this.decodeToken(token);
    return decodedToken?.role || null; 
  }

  decodeToken(token: string): any {
    try {
      const payload = atob(token.split('.')[1]);  
      return JSON.parse(payload); 
    } catch (error) {
      return null;  
    }
  }
}
