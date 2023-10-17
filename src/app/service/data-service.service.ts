import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Task } from '../models/task';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  baseUrl = 'http://localhost:9000/api/v2/user/';
  private token = this.tokenStorage.getToken();

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    
    });
    return headers;
  }

  saveTask(taskData: Task): Observable<any> {
    if (!this.token) {
      return throwError('Authentication token is missing.');
    }
    const headers = this.createHeaders();
    return this.http.post(this.baseUrl + 'task', taskData, { headers });
  }

  getTask(): Observable<any> {
    if (!this.token) {
      return throwError('Authentication token is missing.');
    }
    const headers = this.createHeaders();
    
    return this.http.get(this.baseUrl + 'tasks', { headers });
  }

  deleteTask(id: number): Observable<any> {
    if (!this.token) {
      return throwError('Authentication token is missing.');
    }
    const headers = this.createHeaders();
    return this.http.delete(this.baseUrl + 'task/' + id, { headers });
  }

  updateTask(task: Task,id:number): Observable<any> {
    if (!this.token) {
      return throwError('Authentication token is missing.');
    }

    const headers = this.createHeaders();
    console.log("Hi i am Data Service" +id +" " +JSON.stringify(task));
    return this.http.put(this.baseUrl  + id, task ,{ headers });
  }

  getTaskById(id: number): Observable<any> {
    if (!this.token) {
      return throwError('Authentication token is missing.');
    }
    const headers = this.createHeaders();
    console.log(headers);
    return this.http.get(this.baseUrl + 'getTask/' + id, { headers:headers });
  }

  archiveTask(task: Task): Observable<any> {
    if (!this.token) {
        return throwError('Authentication token is missing.');
    }
    const headers = this.createHeaders();
    task.taskStatus = true;
    return this.http.put(this.baseUrl + 'archiveTask/' + task.id, task, { headers });
}

}
