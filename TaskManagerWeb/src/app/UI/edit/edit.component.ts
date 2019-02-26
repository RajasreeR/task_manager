import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/Services/TaskManager/taskservice.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  task : Task = new Task();
  pageTitle: string = "Edit Task";
  parentTaskNames: any;
  constructor(private _activatedroute: ActivatedRoute,
  private _router: Router, 
  private taskService: TaskserviceService) {
    this.getTaskDetail();     
   }
   HasValue(data: any){
    if (typeof data === "undefined" || data=== null ||
  data === "" || data.length === 0 )
  {
    return false;
  }
  else{
    return true;
  }
  }

  getParentTasks(): void{
    this.taskService.getAllTasks().subscribe(taskData =>{
      if(this.HasValue(taskData)){
        this.parentTaskNames = taskData.filter(item => item !== null);
      }
    });
  }

  ngOnInit() {
    this.getParentTasks();       
  } 
  

  getTaskDetail(): void{    
    const id = +this._activatedroute.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe(taskData =>{
      if(this.HasValue(taskData)){             
        this.task.id = taskData.Id;
        this.task.name = taskData.Name;
        this.task.startDate = taskData.StartDate;
        this.task.endDate = taskData.EndDate;
        this.task.priority = taskData.Priority;
        this.task.isActive = taskData.IsActive;        
        this.task.parentTaskId = taskData.ParentTask;
      }
    });    
  }
  edit(){
    var updatedTask= {
      Id:this.task.id,
      Name: this.task.name,
      Priority: this.task.priority,
      ParentTask: this.task.parentTaskId,
      StartDate: this.task.startDate,
      EndDate: this.task.endDate,
      IsActive: this.task.isActive
    };
    alert (this.task.endDate);
    this.taskService.editTask(updatedTask).subscribe(status =>{      
      alert(status);
      this._router.navigate(['/view']);
    });
  }
  cancelEdit(): void{
    this._router.navigate(['/view']);
  }

}
