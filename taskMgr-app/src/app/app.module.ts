import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule }   from '@angular/common';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { MenuComponent } from './menu/menu.component';
import {CONST_Routing} from './app.routing';
import {UserFirstNameFilter, OrderByPipe} from './pipe';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    MenuComponent,
    UserFirstNameFilter,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientTestingModule,    
    FormsModule,HttpModule,
    ReactiveFormsModule,
    CONST_Routing,HttpClientModule,
    CommonModule
  ],  
  exports:[ReactiveFormsModule,UserFirstNameFilter,
    OrderByPipe],
  schemas: [ NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
