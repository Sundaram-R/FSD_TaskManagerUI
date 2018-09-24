import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/service/user.service';
import {ProjectService } from './service/project.service';
import { User } from '../user/model/user';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ProjectModel } from './model/project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  isDesc: boolean = false;
  column: string = 'project';
  msg: string;
  users : User[];
startDate:any=new Date();
  projects: ProjectModel[];
  project:ProjectModel;

  selectedRow : Number;
  projectFrm: FormGroup;
  returnValue: number;
  btnProjectTitle: string;
  constructor(private userService: UserService,private projectService: ProjectService,private fbProject: FormBuilder) { }

  ngOnInit() {
    this.projectFrm = this.fbProject.group({ project_Id:new FormControl({value:''}),
    project:new FormControl({value:'', Validators:Validators.required}), 
    startDate:new FormControl({value:'' , type:'Date'}), 
    endDate:new FormControl({value:''}), 
    priority:new FormControl({value:''}),
    managerId:new FormControl({value:'',disabled: true}) });
    this.btnProjectTitle = "Add Project";
    this.projectFrm.reset();
    this.loadProjects();
  }
  loadUsersToSelect() {
    this.userService.getUsers().subscribe(users => { this.users = <User[]>users; });
};
setClickedRow(index, managerID){

this.selectedRow=index;
this.projectFrm.get('managerId').setValue(managerID);

}
onStartDateChange(date){
this.startDate=date;
this.startDate=new Date(this.startDate).toISOString();
}
loadProjects() {
  
  this.projectService.getProjects().subscribe(projectData => { this.projects = <ProjectModel[]>projectData; });
}
editProject(currentId: number) {
  this.btnProjectTitle = "Edit Project";
  this.project = this.projects.filter(x => x.project_Id == currentId)[0];
  this.projectFrm.get('project_Id').setValue(this.project.project_Id);
  this.projectFrm.get('priority').setValue(this.project.priority);
  this.projectFrm.get('startDate').setValue(new Date(this.project.startDate));
  this.projectFrm.get('endDate').setValue(this.project.endDate);
  //this.projectFrm.setValue(this.project);
}
deleteProject(currentId: number) {
  this.projectService.deleteProject(currentId).subscribe(data => {
    if (data.toString() == "1") {
      this.msg = "Data deleted successfully";
      this.projectFrm.reset();
    }
    else {
      this.msg = "Error in deleting data";
    }
  }, error => this.msg = <string>error);
  this.loadProjects();
  this.btnProjectTitle = "Add Project";
}
resetForm(){
  this.msg="";
  this.projectFrm.reset();
}
onSubmit(formData: any) {    
  debugger;
  if(this.projectFrm.valid){
  if (this.btnProjectTitle == "Add Project") {
    
    this.projectService.addProject(formData.value).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data Added successfully";
        this.projectFrm.reset();
      }
      else {
        this.msg = "Error in saving data";
      }
    }, error => this.msg = <string>error);
  }
  else if (this.btnProjectTitle == "Edit Project") {
    this.projectService.editProject(formData.value).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data Saved successfully";
        this.projectFrm.reset();
      }
      else {
        this.msg = "Error in updating data";
      }
    }, error => this.msg = <string>error);
  }
}
else{
  this.msg="Please provide proper data";
}
  this.loadProjects();
  this.btnProjectTitle = "Add Project";
}
direction: number;
sort(property) {
  this.isDesc = !this.isDesc; //change the direction    
  this.column = property;
  this.direction = this.isDesc ? 1 : -1;
};
}
