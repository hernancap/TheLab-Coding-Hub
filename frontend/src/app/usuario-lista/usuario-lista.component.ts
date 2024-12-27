import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../model/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-lista',
  imports: [CommonModule],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.css'
})

export class UsuarioListaComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  constructor(private userService: UsuarioService) {}

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
    console.log('Navegar a agregar usuario');
  }

  onEdit(user: User): void {
    console.log('Editar usuario:', user);
  }

  onDelete(user: User): void {
    console.log('Eliminar usuario:', user);
  }

}
