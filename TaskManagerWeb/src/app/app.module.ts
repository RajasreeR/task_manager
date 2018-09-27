import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddComponent } from './UI/add/add.component';
import { SearchComponent } from './UI/search/search.component';
import { EditComponent } from './UI/edit/edit.component';
import {RouterModule,Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskserviceService } from 'src/app/Services/TaskManager/taskservice.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'view', component: SearchComponent},
      {path: 'edit/:id', component: EditComponent},      
      {path: 'add', component: AddComponent},
      {path: '', redirectTo: 'add', pathMatch:'full'},
      {path:'*', redirectTo: 'add', pathMatch: 'full'}
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TaskserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
