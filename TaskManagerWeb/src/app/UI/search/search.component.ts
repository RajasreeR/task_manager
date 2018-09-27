import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  taskList : Task[] ;
  _name: string;
  _parentTask: string;
  _priorityFrom: number;
  _priorityTo: number;
  filterList: Task[];
  _startDate: Date;
  _endDate: Date;
  constructor() {
    this.taskList = [
      { id: 1,name: "Task 1", priority: 10, parentTask: "", startDate: new Date(), endDate : new Date()},
      { id: 2,name: "Task 2", priority: 10, parentTask: "Task 1", startDate: new Date(), endDate : new Date()},
      { id: 3,name: "Task 3", priority: 10, parentTask: "Task 1", startDate: new Date(), endDate : new Date()},
      { id: 4,name: "Task 4", priority: 10, parentTask: "", startDate: new Date(), endDate : new Date()},
      { id: 5,name: "Task 5", priority: 10, parentTask: "Task 4", startDate: new Date(), endDate : new Date()}
    ]
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


  ngOnInit() {
    this.filterList = this.taskList;
  }

  delete(task: Task):void{
    this.filterList = this.filterList.filter(t => t!==task);
    //add delete logic from service
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

}
