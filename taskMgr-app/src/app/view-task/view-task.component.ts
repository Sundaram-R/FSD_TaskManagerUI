import { Component, OnInit } from '@angular/core';
import{ProjectService} from '../project/service/project.service';
import {TaskService } from '../task/service/task.service';
import { TaskModel } from '../task/model/task';
import { ProjectModel } from '../project/model/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  selectedProject:number;
  tasks: TaskModel[];
  task:TaskModel;
  msg: string;
  selectedRow:number;
  projects:ProjectModel[];
  constructor(private taskService:TaskService, private projectService:ProjectService) { }

  ngOnInit() {
  }
  
    
  
  loadProjectsToSelect() {
    
    this.projectService.getProjects().subscribe(projectData => { this.projects = <ProjectModel[]>projectData; });
  }
  setProjectClickedRow(index,projectID){      
    this.selectedRow=index;
    this.selectedProject = projectID;
    
  }
  endTask(model:TaskModel){
    model.status="Completed";
    this.taskService.addTask(model).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Task completed";        
        this.getRelatedTasks();
      }
      else {
        this.msg = "Error in saving data";
      }
    }, error => this.msg = <string>error);
  }
  getRelatedTasks(){
    
    this.taskService.getTasks().subscribe(taskData => { this.tasks = (<TaskModel[]>taskData).filter(x=>x.projectID==this.selectedProject); });
    //this.tasks = this.tasks.filter(x=>x.projectID ==this.selectedProject );
  }
}
