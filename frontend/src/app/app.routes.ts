import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users/login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventoListaComponent, canActivate: [AuthGuard] },
  { path: 'events/edit/:id', component: EventoFormComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'events/add', component: EventoFormComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'users', component: UsuarioListaComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'users/edit/:id', component: UsuarioFormComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'users/add', component: UsuarioFormComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'users/add/from-login', component: UsuarioFormComponent },
];


export const routes: Routes = [];
