import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  

  url="http://localhost:9000/api/v2/saveUser"

  url2="http://localhost:9000/api/v1/login"
  constructor(private http: HttpClient) { }

  saveLogin(event: any): Observable<User> {
    return this.http.post<User>(this.url, event,httpOptions);
  }
  authenticateUser(userEmail:string,userPassword:string):Observable<string> {
    return this.http.post<string>(this.url2, { userEmail, userPassword },httpOptions);
  }
}
