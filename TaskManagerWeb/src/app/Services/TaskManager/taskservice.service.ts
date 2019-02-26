import { Injectable } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpHeaderOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json', 'withCredentials':'true'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  selectedTask: Task;
  taslList: Task[];
  //serviceUrl: string = 'http://localhost:50032';
  serviceUrl: string = environment.API_URL;
  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<any[]>{
      return this.http.get<Task[]>(this.serviceUrl+'/api/tasks/all');
    }

  public getTask(id: number): Observable<any>{
      return this.http.get<Task>(this.serviceUrl+'/api/task/' + id);
    }

   public addTask(task: any){  
       
      return this.http.post<string>(this.serviceUrl+'/api/tasks/add', JSON.stringify(task),httpHeaderOptions);
    }

   public editTask(task: any): Observable<string>{
      return this.http.put<string>(this.serviceUrl+'/api/tasks/edit', JSON.stringify(task), httpHeaderOptions);
    }

  }
