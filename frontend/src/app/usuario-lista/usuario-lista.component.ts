import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../models/usuario';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  imports: [CommonModule],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.css'
})

export class UsuarioListaComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        this.errorMessage = 'Error al cargar la lista de usuarios';
        console.error(err);
      }
    });
  }

  navigateToAddUser(): void {
    this.router.navigate([`/users/add`]);
  }

  onEdit(user: User): void {
    this.router.navigate([`/users/edit`, user.id]);
  }

  onDelete(user: User): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;
  
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(e => e.id !== user.id);
        alert('Usuario eliminado con éxito.');
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('Ocurrió un error al intentar eliminar el usuario.');
      }
    });
  }

}
