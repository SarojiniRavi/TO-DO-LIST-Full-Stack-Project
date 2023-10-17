import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { TaskComponent } from './task/task.component';
import { RemainderComponent } from './remainder/remainder.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialExampleModule } from './material-module.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { MatInputModule } from '@angular/material/input';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    TaskComponent,
    RemainderComponent,
    ArchiveComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignUpComponent,
    TaskAddComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskupdateComponent,
    FooterComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialExampleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
