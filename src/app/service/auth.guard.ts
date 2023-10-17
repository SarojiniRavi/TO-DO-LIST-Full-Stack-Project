import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard is running.'); 
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.log('User is not authenticated, redirecting to login.'); 
      this.router.navigate(['/login']);
      return false;
    }
  }
}
