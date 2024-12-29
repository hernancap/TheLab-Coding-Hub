import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userRole = this.authService.getUserRole() ?? 'guest';
   }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
