import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventoListaComponent } from './evento-lista/evento-lista.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventoListaComponent }
];


export const routes: Routes = [];
