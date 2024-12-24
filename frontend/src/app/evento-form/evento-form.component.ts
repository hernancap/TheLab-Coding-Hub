import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Event } from '../model/evento';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [],
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventFormComponent {
  @Input() event: Event | null = null;
  @Output() onEventCreated = new EventEmitter<Event>();

  constructor(private eventService: EventoService) {}

  saveEvent() {
    if (this.event) {
      this.eventService.updateEvent(this.event.id, this.event).subscribe({
        next: (updatedEvent) => this.onEventCreated.emit(updatedEvent),
        error: (err) => console.error('Error updating event', err)
      });
    } else {
      this.eventService.createEvent(this.event!).subscribe({
        next: (newEvent) => this.onEventCreated.emit(newEvent),
        error: (err) => console.error('Error creating event', err)
      });
    }
  }
}
