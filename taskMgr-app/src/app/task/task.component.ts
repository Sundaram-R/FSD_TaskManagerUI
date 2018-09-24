import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/service/user.service';
import{ProjectService} from '../project/service/project.service';
import {TaskService } from './service/task.service';
import { User } from '../user/model/user';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { TaskModel } from './model/task';
import {IMyDpOptions} from 'mydatepicker';
import { ProjectModel } from '../project/model/project';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isDesc: boolean = false;
  column: string = 'taskName';
  msg: string;
  users : User[];
  projects:ProjectModel[];
  project:ProjectModel;
  tasks: TaskModel[];
  task:TaskModel;
  myDatePickerOptions: IMyDpOptions = {    
    dateFormat: 'yyyy/mm/dd',
};
  selectedRow : Number;
  taskFrm: FormGroup;
  returnValue: number;
  btnTaskTitle: string;
  constructor(private taskService:TaskService, private projectService:ProjectService, private userService:UserService,private fbTask: FormBuilder) { }

  ngOnInit() {
    this.taskFrm = this.fbTask.group({ taskId:new FormControl({value:''}),
    taskName:new FormControl({value:'', Validators:Validators.required}), 
    projectID:new FormControl({value:''}),
    taskOwner:new FormControl({value:''}),
    startDate:new FormControl({value:'' }), 
    endDate:new FormControl({value:''}), 
    priority:new FormControl({value:0}),
    parentTask:new FormControl({value:''}),
    isParentTask:new FormControl({value:''}) });
    this.btnTaskTitle = "Add Task";
    this.taskFrm.reset();
  }
  loadUsersToSelect() {
    this.userService.getUsers().subscribe(users => { this.users = <User[]>users; });
};
loadTasksToSelect() {
  
  this.taskService.getTasks().subscribe(taskData => { this.tasks = <TaskModel[]>taskData; });
}
loadProjectsToSelect() {
  
  this.projectService.getProjects().subscribe(projectData => { this.projects = <ProjectModel[]>projectData; });
}
setClickedRow(index, taskOwnerID){

this.selectedRow=index;
this.taskFrm.get('taskOwner').setValue(taskOwnerID);

}
setDate(): void {
  
  // Set today date using the patchValue function
  let date = new Date();
  this.taskFrm.patchValue({startDate: {
  date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()}
  }});
}

clearDate(): void {
  // Clear the date using the patchValue function
  this.taskFrm.patchValue({startDate: null});
}
  onTaskSubmit(formData: any) {    

  let taskData:TaskModel =new TaskModel();
  taskData.startDate = new Date(formData.value.startDate.formatted);  
  taskData.endDate = new Date(formData.value.endDate.formatted);
  taskData.taskId = formData.value.taskId;
  taskData.isParentTask = formData.value.isParentTask;
  taskData.parentTask = formData.value.parentTask;
  taskData.priority = formData.value.priority;
  taskData.projectID = formData.value.projectID;
  taskData.taskName = formData.value.taskName;
  taskData.taskOwner = formData.value.taskOwner;

  if(this.taskFrm.valid){
  if (this.btnTaskTitle == "Add Project") {
    console.log(formData.value);
    this.taskService.addTask(taskData).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data Added successfully";
        this.taskFrm.reset();
      }
      else {
        this.msg = "Error in saving data";
      }
    }, error => this.msg = <string>error);
  }
  
}
 
}
}
