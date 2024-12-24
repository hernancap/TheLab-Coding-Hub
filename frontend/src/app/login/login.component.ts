import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.usuarioService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log( 'Login exitoso: ', response), 
        this.errorMessage = '';
        this.router.navigate(['/events']);
      },
      error: (error) => { 
        console.error('Error al hacer login: ', error),
        this.errorMessage = 'Usuario o contraseña ingresados incorrectos';
      }
      });
  }
}
