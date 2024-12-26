import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Event } from '../model/evento';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit() {
    this.getEvents();
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

  navigateToAddEvent(): void {
    this.router.navigate(['/events/add']);
  }
  
}
