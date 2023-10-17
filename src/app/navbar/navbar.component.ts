import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Task } from '../models/task';
import { AuthService } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tasks:Task[]
  
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private authService:AuthService,
    private router:Router){

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isLoggedIn(): boolean {
      return this.authService.isAuthenticated();
    }
  

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
    taskImageSrc: string = 'assets/images/task.png';
    remaindersImageSrc: string = 'assets/images/R (1).png';
    archiveImageSrc: string = 'assets/images/archive.png';
    logoImagePath: string = 'assets/images/7910522.png';
}
