import { Injectable } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  selectedTask: Task;
  taslList: Task[];
  serviceUrl: string = 'http://localhost:50032';
  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<Task[]>{
      return this.http.get<Task[]>(this.serviceUrl+'/api/tasks/all');
    }

  public getTask(id: number): Observable<Task>{
      return this.http.get<Task>(this.serviceUrl+'/api/task/' + id);
    }

    addTask(task: Task){
      this.http.post(this.serviceUrl+'/api/tasks/add', JSON.stringify(task));
    }

    editTask(task: Task){
      this.http.put(this.serviceUrl+'/api/tasks/edit', JSON.stringify(task));
    }

  }
