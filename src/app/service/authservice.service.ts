import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenStorageService: TokenStorageService) {}

  login(token: string, user: any): void {
    this.tokenStorageService.saveToken(token);
    this.tokenStorageService.saveUser(user);
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorageService.getToken();
  }
}
