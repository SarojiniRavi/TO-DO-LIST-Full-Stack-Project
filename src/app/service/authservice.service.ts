import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenStorageService: TokenStorageService) {}

  logout(): void {
    this.tokenStorageService.signOut();
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorageService.getToken();
  }
}
