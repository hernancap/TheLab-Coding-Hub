import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventoListaComponent },
  { path: 'events/edit/:id', component: EventoFormComponent},
  { path: 'events/add', component: EventoFormComponent},
  { path: 'users', component: UsuarioListaComponent },
  { path: 'users/edit/:id', component: UsuarioFormComponent},
  { path: 'users/add', component: UsuarioFormComponent},
  { path: 'users/add/from-login', component: UsuarioFormComponent },
];


export const routes: Routes = [];
