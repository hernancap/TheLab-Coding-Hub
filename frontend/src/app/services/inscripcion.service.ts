import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private url = `${environment.api}/inscripciones`;

  constructor(private http: HttpClient) { }

  createInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.url, inscripcion);
  }

  deleteInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getInscriptions(id: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.url}/${id}`);
  }
  
}
