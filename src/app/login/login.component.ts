import { Component } from '@angular/core';
import { UserRegisterService } from '../service/user-register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../service/token-storage.service';
import { RouteService } from '../service/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
userEmail:string="";
userPassword:string="";
isLoggedIn = false;

  constructor(
    private userRegister: UserRegisterService,
    private matSnackbar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private router:RouteService
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  login() {
    if (!this.userEmail || !this.userPassword) {
      this.matSnackbar.open('Please provide both email and password.', 'Close', {
        duration: 3000,
      });
      return;
    }
    
    this.userRegister.authenticateUser(this.userEmail, this.userPassword).subscribe(
      (response) => {
        if (typeof response === 'string') {
          const token = response;
          this.tokenStorage.saveToken(token);
          this.isLoggedIn = true;
          this.matSnackbar.open('Login successful!', 'Close', {
            duration: 3000,
          
          });
          this.router.navigateToTaskView();
        } else {
          this.matSnackbar.open('Invalid credentials. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      },
      (error) => {
        console.error('Authentication error:', error);
        this.matSnackbar.open('Invalid credentials. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
}
