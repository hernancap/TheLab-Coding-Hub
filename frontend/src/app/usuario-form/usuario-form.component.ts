import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false; 
  isFromLogin = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.isEditMode = true;
        this.userId = +params.get('id')!;
        this.loadUserData();
      } else {
        this.userForm.patchValue({ role: 'user' });
      }
  
      this.isFromLogin = params.get('fromLogin') === 'true';
  
      if (this.isFromLogin) {
        this.userForm.patchValue({ role: 'user' });
      }
    });
  }

  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: User) => {
          this.userForm.patchValue(user); 
        },
        error: (err) => console.error('Error al cargar usuario:', err),
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
  
    const userData: User = this.userForm.value;
  
    if (this.isEditMode) {
      this.userService.updateUser(this.userId!, userData).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Error al actualizar usuario:', err),
      });
    } else {
      this.userService.registerUser(userData).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Error al crear usuario:', err),
      });
    }
  }

  onCancel(): void {
    if (this.isFromLogin) {
      this.router.navigate(['/login']); 
    } else {
      this.router.navigate(['/users']); 
    }
  }

}
