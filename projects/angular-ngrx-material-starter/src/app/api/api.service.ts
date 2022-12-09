import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Task, TaskStatus } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getTask(task_id: number): Observable<Task> {
    return this.http.get<Task>('/api/tasks/' + task_id);
  }

  public addTask(title: string): Observable<any> {
    return this.http.post('/api/tasks', { title });
  }

  public delTask(task_id: number): Observable<any> {
    return this.http.delete('/api/tasks/' + task_id);
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  public getTaskStatus(task_id: number): Observable<TaskStatus[]> {
    return this.http.get<TaskStatus[]>('/api/tasks-status/' + task_id);
  }

  public setTaskStatus(task_id: number, student_name: string, status: Status) {
    return this.http.post('/api/tasks-status', {
      task_id,
      student_name,
      status
    });
  }
}
