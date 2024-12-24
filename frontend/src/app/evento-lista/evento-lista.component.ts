import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Event } from '../model/evento';
import { CommonModule } from '@angular/common';

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

  constructor(private eventoService: EventoService) {}

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

  deleteEvent(id: number) {
    this.eventoService.deleteEvent(id).subscribe({
      next: () => this.getEvents(),
      error: (err) => console.error('Error: ', err)
    });
  }
}
