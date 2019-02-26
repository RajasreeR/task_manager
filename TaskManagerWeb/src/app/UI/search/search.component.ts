import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TaskserviceService } from 'src/app/Services/TaskManager/taskservice.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  taskList : Array<Task> = [] ;
  _name: string;
  _parentTask: string;
  _priorityFrom: number;
  _priorityTo: number;
  filterList: Task[];
  _startDate: Date;
  _endDate: Date;
  constructor(private taskService: TaskserviceService) {
 
   }

   get startDate(): Date{
     return this._startDate;
   }
   set startDate(value: Date)
   {
     this._startDate = value;
     this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
   }
   get endDate(): Date{
    return this._endDate;
  }
  set endDate(value: Date)
  {
    this._endDate = value;
    this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
  }
   get parentTask():string{
     return this._parentTask;
   }
   set parentTask(value:string){
     this._parentTask = value;
     this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
   }

   get name():string{
    return this._name;
  }
  set name(value:string){
    this._name = value;
    this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
  }

  get priorityFrom():number{
    return this._priorityFrom;
  }
  set priorityFrom(value:number){
    this._priorityFrom = value;
    this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
  }

  get priorityTo():number{
    return this._priorityTo;
  }
  set priorityTo(value:number){
    this._priorityTo = value;
    this.performFilter(this._name, this._priorityFrom, this._parentTask, this._priorityTo, this._startDate, this._endDate);
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
  getAllTasks(): void{    
    this.taskService.getAllTasks().subscribe(taskData =>{
      if(this.HasValue(taskData)){
        taskData.forEach(obj => {          
           let newTask = new Task();
           newTask.id = obj.Id;
           newTask.name = obj.Name;
           if(this.HasValue(obj.ParentTask)){
           newTask.parentTask = taskData.find(t => t.Id == obj.ParentTask).Name;
           }
           else{
            newTask.parentTask = "";
           }
           newTask.priority = obj.Priority;
           newTask.startDate = obj.StartDate;
           newTask.endDate = obj.EndDate;
           newTask.isActive = obj.IsActive;           
           this.taskList.push(newTask);
        })         
      }
    });
  }

  ngOnInit() {
    this.getAllTasks();
    this.filterList = this.taskList;
  }

  endTask(task: Task):void{  
    var updatedTask= {
      Id:task.id,
      Name: task.name,
      Priority: task.priority,
      ParentTask: task.parentTaskId,
      StartDate: task.startDate,
      EndDate: task.endDate,
      IsActive: false
    };
    this.taskService.editTask(updatedTask).subscribe(status =>{      
      alert(status);
      this.taskList = [];
      this.getAllTasks();
      this.filterList = this.taskList;
      this.resetFilters();
    });      
  }

  performFilter(filterName: string, filterPriorityFrom: number, filterParent: string, filterPriorityTo: number, filterStart: Date, filterEnd: Date ){
    this.filterList = this.taskList;
    this.filterList = filterName ? 
    this.taskList.filter(t => t.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
    : this.filterList;
    this.filterList = filterParent ? 
    this.filterList.filter(t => t.parentTask.toLocaleLowerCase().includes(filterParent.toLocaleLowerCase()))
    : this.filterList;
    this.filterList = filterPriorityFrom ? this.filterList.filter(i => i.priority >= filterPriorityFrom)
     : this.filterList;
     this.filterList = filterPriorityTo ? this.filterList.filter(i => i.priority <= filterPriorityTo)
     : this.filterList;
     this.filterList = filterStart ? this.filterList.filter(i => i.startDate >= filterStart) : this.filterList;
     this.filterList = filterEnd ? this.filterList.filter(i => i.endDate <= filterEnd): this.filterList;
  
  }

  resetFilters()
  {
    this.startDate = null;
    this.endDate = null;
    this.parentTask = null;
    this.name = null;
    this.priorityFrom = null;
    this.priorityTo = null;
  }

}
