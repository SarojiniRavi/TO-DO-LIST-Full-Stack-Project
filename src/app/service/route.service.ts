import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router:Router) { }
 
  navigateToHomeView() {
    this.router.navigate(["/home"]);
  }
  navigateToLoginView(){
    this.router.navigate(["/login"]);
  }
  navigateToTaskView(){
    this.router.navigate(['/taskview']);
  }
  navigateToTask() {
    this.router.navigate(["/task"]);
  }
  navigateToUpdateTask() {
    this.router.navigate(['/taskupdate']);
  }
}
