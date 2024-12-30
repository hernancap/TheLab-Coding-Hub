import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Event } from '../models/evento';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InscripcionService } from '../services/inscripcion.service';
import { Inscripcion } from '../models/inscripcion';


@Component({
  selector: 'app-evento-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent {
  events: Event[] = [];
  errorMessage: string = '';
  userRole: string = '';
  inscriptions: Inscripcion[] = [];
  userId: number = 0;

  constructor(
    private eventoService: EventoService, 
    private router: Router,
    private authService: AuthService,
    private inscripcionService: InscripcionService,
  ) {
    this.userRole = this.authService.getUserRole() ?? 'guest';
    this.userId = parseInt(localStorage.getItem('userId') ?? '0', 10);
  }

  ngOnInit() {
    this.getEvents();
    this.getUserInscriptions();
  }

  getEvents() {
    this.eventoService.getEvents().subscribe({
      next: (events) => this.events = events,
      error: (err) => {
        console.error('Error: ', err);
        this.errorMessage = 'Error al obtener los eventos';
      }
    });
  }

  getUserInscriptions() {
    this.inscripcionService.getInscriptions(this.userId).subscribe({
      next: (inscriptions) => this.inscriptions = inscriptions,
      error: (err) => console.error('Error al cargar inscripciones: ', err),
    });
  }

  isUserInscribed(event: Event): boolean {
    return this.inscriptions.some(
      (inscription) => inscription.id_evento === event.id
    );
  }  

  onEdit(event: Event): void {
    this.router.navigate([`/events/edit`, event.id]);
  }
  
  onDelete(event: Event): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este evento?');
    if (!confirmDelete) return;
  
    this.eventoService.deleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== event.id);
        alert('Evento eliminado con éxito.');
      },
      error: (err) => {
        console.error('Error al eliminar evento:', err);
        alert('Ocurrió un error al intentar eliminar el evento.');
      }
    });
  }

  inscribeToEvent(event: Event): void {
    const newInscription: Inscripcion = {
      id_usuario: this.userId,
      id_evento: event.id,
    };
  
    this.inscripcionService.createInscripcion(newInscription).subscribe({
      next: (inscription) => {
        this.inscriptions.push(inscription);
        alert('Inscripción realizada con éxito.');
        window.location.reload(); 
      },
      error: (err) => {
        console.error('Error al inscribirse: ', err);
        alert('Ocurrió un error al intentar inscribirse.');
      },
    });
  }
  
  cancelInscription(event: Event): void {
    const inscription = this.inscriptions.find(
      (inscription) => inscription.id_evento === event.id
    );
  
    if (!inscription || inscription.id === undefined) return;
  
    this.inscripcionService.deleteInscripcion(inscription.id).subscribe({
      next: () => {
        this.inscriptions = this.inscriptions.filter(
          (i) => i.id !== inscription.id
        );
        alert('Inscripción cancelada con éxito.');
      },
      error: (err) => {
        console.error('Error al cancelar inscripción: ', err);
        alert('Ocurrió un error al intentar cancelar la inscripción.');
      },
    });
  }
  
  navigateToAddEvent(): void {
    this.router.navigate(['/events/add']);
  }
  
}
