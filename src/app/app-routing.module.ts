import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArchiveComponent } from './archive/archive.component';
import { RemainderComponent } from './remainder/remainder.component';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { AuthGuard } from './service/auth.guard';



const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "signUp", component: SignUpComponent },
  { path: "task", component: TaskComponent },
  { path: "login", component: LoginComponent },
  { path: "taskview", component: TaskViewComponent, canActivate: [AuthGuard] },
  { path: "archive", component: ArchiveComponent, canActivate: [AuthGuard] },
  { path: "taskupdate", component: TaskupdateComponent },
  { path: "remainders", component: RemainderComponent, canActivate: [AuthGuard] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
