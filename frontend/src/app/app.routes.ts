import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { EventoFormComponent } from './evento-form/evento-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventoListaComponent },
  { path: 'events/edit/:id', component: EventoFormComponent},
  { path: 'events/add', component: EventoFormComponent}
];


export const routes: Routes = [];
