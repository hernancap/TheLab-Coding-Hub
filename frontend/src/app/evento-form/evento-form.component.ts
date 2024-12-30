import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from '../services/evento.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { format } from 'date-fns';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/es'; 

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatNativeDateModule,
    MatMomentDateModule
  ],
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter()
  ],
})

export class EventoFormComponent implements OnInit {
  eventoForm!: FormGroup;
  id!: number;
  isEditing = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditing = !!this.id;

    this.eventoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', [Validators.required]],
      available_slots: ['', [Validators.required, Validators.min(0)]],
    });

    if (this.isEditing) {
      this.eventoService.getEventById(this.id).subscribe({
        next: (event) => {
          this.eventoForm.patchValue(event);
        },
        error: (err) => {
          this.errorMessage = 'Error cargando el evento';
          console.error(err);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.eventoForm.invalid) {
      return;
    }
  
    const eventoData = { ...this.eventoForm.value };
  
    eventoData.date = format(new Date(eventoData.date), 'yyyy-MM-dd');
  
    if (this.isEditing) {
      this.eventoService.updateEvent(this.id, eventoData).subscribe({
        next: () => this.router.navigate(['/events']),
        error: (err) => {
          this.errorMessage = 'Error al actualizar el evento';
          console.error(err);
        },
      });
    } else {
      this.eventoService.createEvent(eventoData).subscribe({
        next: () => this.router.navigate(['/events']),
        error: (err) => {
          this.errorMessage = 'Error al crear el evento';
          console.error(err);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/events']);
  }
}
