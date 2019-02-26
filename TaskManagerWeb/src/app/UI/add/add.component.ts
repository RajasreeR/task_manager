import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TaskserviceService } from 'src/app/Services/TaskManager/taskservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  task : Task;
  pageTitle: string = "Add Task";
  parentTaskNames: any;
  constructor(private taskService: TaskserviceService) {    
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
    this.task = {id:0,name:"",priority:0, parentTask:"",parentTaskId: 0, startDate:null, endDate:null, isActive: true};
  }

  
  addTask(): void
  {
    
    
    var createdTask= {
      Id:0,
      Name: this.task.name,
      Priority: this.task.priority,
      ParentTask: this.task.parentTaskId,
      StartDate: this.task.startDate,
      EndDate: this.task.endDate,
      IsActive: true
    };
    this.taskService.addTask(createdTask).subscribe(status =>{      
      alert(status);
      this.reset();
    });    
  }

  reset(): void{
    this.task = {id:0,name:"",priority:0, parentTask:"",parentTaskId: 0, startDate:null, endDate:null, isActive: true};
  }

}
