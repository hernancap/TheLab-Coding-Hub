import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/evento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private url : string;
  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/events`);
  }

  createEvent(event: Event): Observable<any> {
    return this.http.post(this.url, event);
  }

  updateEvent(id: number, event: Event): Observable<any> {
    return this.http.put(`${this.url}/${id}`, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
