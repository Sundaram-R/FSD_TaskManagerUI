import { Component, OnInit } from '@angular/core';
import{ProjectService} from '../project/service/project.service';
import {TaskService } from '../task/service/task.service';
import { TaskModel } from '../task/model/task';
import { ProjectModel } from '../project/model/project';
import { FormGroup , FormBuilder,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  editByTaskId:boolean=false;
  selectedProject:number;
  tasks: TaskModel[];
  task:TaskModel;
  taskEditFrm:FormGroup;
  msg: string;
  selectedRow:number;
  projects:ProjectModel[];
  constructor(private taskService:TaskService, private projectService:ProjectService,private fbEditTask: FormBuilder) { }

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
    this.taskService.editTask(model).subscribe(data => {
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
  loadTasksToSelect() {
  
    this.taskService.getTasks().subscribe(taskData => { this.tasks = <TaskModel[]>taskData; });
  }
  setParentTaskClickedRow(index,parentId){  
    this.selectedRow=index;
    this.taskEditFrm.get('parentTask').setValue(parentId);
  }
  onTaskSubmit(formData){
    
    console.log(formData.value);
    if(this.taskEditFrm.valid){
      let taskData:TaskModel =new TaskModel();
      if(formData.value.startDate){        
      taskData.startDate = new Date(formData.value.startDate.formatted);  
      if(!formData.value.startDate.formatted && formData.value.startDate.date)
      {
        taskData.startDate = new Date(formData.value.startDate.date.year,formData.value.startDate.date.month, formData.value.startDate.date.day);
      }
      }
      if(formData.value.endDate){
      taskData.endDate = new Date(formData.value.endDate.formatted);
      if(!formData.value.endDate.formatted && formData.value.endDate.date)
      {
        taskData.endDate = new Date(formData.value.endDate.date.year,formData.value.endDate.date.month, formData.value.endDate.date.day);
      }
      
    }
      taskData.taskId = formData.value.taskId;
      taskData.isParentTask = formData.value.isParentTask;
      taskData.parentTask = formData.value.parentTask;
      taskData.priority = formData.value.priority;
      taskData.projectID = formData.value.projectID;
      taskData.taskName = formData.value.taskName;
      taskData.taskOwner = formData.value.taskOwner;
      taskData.status =formData.value.status;
      
      
        this.taskService.editTask(taskData).subscribe(data => {
          if (data.toString() == "1") {
            this.msg = "Data Added successfully";
            this.taskEditFrm.reset();
            this.getRelatedTasks();
          }
          else {
            this.msg = "Error in saving data";
          }
        }, error => this.msg = <string>error);
      
    }
     else{
       this.msg="Invalid Data";
     }
      
  }
  editTask(model:TaskModel){
    this.editByTaskId = true;
    this.taskEditFrm = this.fbEditTask.group({ taskId:new FormControl({value:''}),
    taskName:new FormControl({value:'', Validators:Validators.required}), 
    projectID:new FormControl({value:''}),
    taskOwner:new FormControl({value:''}),
    startDate:new FormControl({value:'' }), 
    endDate:new FormControl({value:''}), 
    status:new FormControl({value:''}), 
    priority:new FormControl({value:''}),
    parentTask:new FormControl({value:''}),
    isParentTask:new FormControl({value:''}) });
    
    this.taskEditFrm.get('taskId').patchValue(model.taskId);
    this.taskEditFrm.get('taskName').patchValue(model.taskName);
    this.taskEditFrm.get('projectID').patchValue(model.projectID);
    this.taskEditFrm.get('taskOwner').patchValue(model.taskOwner);
    this.taskEditFrm.get('priority').patchValue(model.priority);
    this.taskEditFrm.get('parentTask').patchValue(model.parentTask);
    this.taskEditFrm.get('isParentTask').patchValue(model.isParentTask);
    this.taskEditFrm.get('status').patchValue(model.status);
    let currentStartDate=new Date(model.startDate);
  this.taskEditFrm.patchValue({startDate: {
    date: {
        year: currentStartDate.getFullYear(),
        month: currentStartDate.getMonth() + 1,
        day: currentStartDate.getDate()}
    }});
    let currentEndDate=new Date(model.endDate);
    this.taskEditFrm.patchValue({endDate: {
      date: {
          year: currentEndDate.getFullYear(),
          month: currentEndDate.getMonth() + 1,
          day: currentEndDate.getDate()}
      }});
  }
}
