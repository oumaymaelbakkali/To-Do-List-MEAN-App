import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, first } from 'rxjs';
import { Task } from '../common/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:7070/api";
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();


  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<Request> {
    const api = `${this.apiUrl}/addTask`;
    console.log('new request', api);
    return this.http.post<Request>(api, task);
  }


  updateTask(task:Task): Observable<any> {
    const api = `${this.apiUrl}/updateTask`;
    return this.http.post<any>(api, task).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  

  getAllTasks(): void {
    const api = `${this.apiUrl}/getAllTasks`;
    this.http.get<Task[]>(api).subscribe(
      (tasks: Task[]) => {
        this.tasksSubject.next(tasks);
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  
  getAllTerminateTask(): void {
    const api = `${this.apiUrl}/getAllTerminateTask`;
    this.http.get<Task[]>(api).subscribe(
      (tasks: Task[]) => {
        this.tasksSubject.next(tasks);
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  deleteTask(taskId: string): void {
    const api = `${this.apiUrl}/deleteTask/${taskId}`;
    this.http.post<Request>(api, {}).subscribe(
      () => {
        // Update tasks after successful deletion
        const currentTasks = this.tasksSubject.value.filter(task => task._id !== taskId);
      
        this.tasksSubject.next(currentTasks);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  } 
  

  updateTasks(response: any): void {
    const currentTasks = this.tasksSubject.value;
    currentTasks.push(response);
    this.tasksSubject.next(currentTasks);
  }
  
}
