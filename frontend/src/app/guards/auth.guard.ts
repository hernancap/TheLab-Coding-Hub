import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

interface RouteData {
  expectedRole?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = (next.data as RouteData).expectedRole; 
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole();

    if (!isAuthenticated) {
      this.router.navigate(['/login']); 
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/events']); 
      return false;
    }

    return true; 
  }
}
