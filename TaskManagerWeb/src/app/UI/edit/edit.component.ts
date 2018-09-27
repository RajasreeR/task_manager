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
  task : Task;
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
        this.task = taskData;
      }
    });
    //this.task = { id:23,name: "Task 1", priority: 15, parentTask: "Task 2", startDate: new Date(), endDate: new Date()};
  }
  edit(){
    alert("Edit");
    //code to be added
  }
  cancelEdit(): void{
    this._router.navigate(['/view']);
  }

}
