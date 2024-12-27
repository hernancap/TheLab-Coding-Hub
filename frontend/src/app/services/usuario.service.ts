import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url : string;
  constructor(private http: HttpClient) {
    this.url = `${environment.api}/users`;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/register`, { username, password });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url);
  }

}
