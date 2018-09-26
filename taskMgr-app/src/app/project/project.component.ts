import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/service/user.service';
import {ProjectService } from './service/project.service';
import { User } from '../user/model/user';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { ProjectModel } from './model/project';
import {IMyDpOptions} from 'mydatepicker';

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

  projects: ProjectModel[];
  project:ProjectModel;
 
  
  selectedRow : Number;
  projectFrm: FormGroup;
  returnValue: number;
  btnProjectTitle: string;
  myDatePickerOptionsSD: IMyDpOptions;
  myDatePickerOptionsED:IMyDpOptions;
  constructor(private userService: UserService,private projectService: ProjectService,private fbProject: FormBuilder) { }

  ngOnInit() {
    this.myDatePickerOptionsSD= {
      dateFormat: 'yyyy/mm/dd', disableUntil:{ year:new Date().getFullYear(), month:new Date().getMonth()+1, day:new Date().getDate()-1 }
    }
    this.myDatePickerOptionsED= {
      dateFormat: 'yyyy/mm/dd', disableUntil:{ year:new Date().getFullYear(), month:new Date().getMonth()+1, day:new Date().getDate() }
    }
    this.projectFrm = this.fbProject.group({ project_Id:new FormControl({value:''}),
    project:new FormControl({value:'', Validators:Validators.required}), 
    startDate:new FormControl({value:'' }), 
    endDate:new FormControl({value:''}), 
    priority:new FormControl({value:0}),
    setDates:new FormControl({value:false}),
    managerId:new FormControl({value:''}) });
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
setDate(): void {
  
  // Set today date using the patchValue function
  let date = new Date();
  this.projectFrm.patchValue({startDate: {
  date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()}
  }});
}

clearDate(): void {
  // Clear the date using the patchValue function
  this.projectFrm.patchValue({startDate: null});
}
loadProjects() {
  
  this.projectService.getProjects().subscribe(projectData => { this.projects = <ProjectModel[]>projectData; });
}
editProject(currentId: number) {
  this.btnProjectTitle = "Edit Project";
  this.project = this.projects.filter(x => x.project_Id == currentId)[0];
  this.projectFrm.get('project_Id').patchValue(this.project.project_Id);
  this.projectFrm.get('priority').patchValue(this.project.priority);
  this.projectFrm.get('project').patchValue(this.project.project);
  if(this.project.startDate && this.project.endDate){
    this.projectFrm.get('setDates').patchValue(true);
  }
  let currentStartDate=new Date(this.project.startDate);
  this.projectFrm.patchValue({startDate: {
    date: {
        year: currentStartDate.getFullYear(),
        month: currentStartDate.getMonth() + 1,
        day: currentStartDate.getDate()}
    }});
    let currentEndDate=new Date(this.project.endDate);
    this.projectFrm.patchValue({endDate: {
      date: {
          year: currentEndDate.getFullYear(),
          month: currentEndDate.getMonth() + 1,
          day: currentEndDate.getDate()}
      }});
  this.projectFrm.get('managerId').patchValue(this.project.managerId);
  //this.projectFrm.setValue(this.project);
}
deleteProject(currentId: number) {
  this.projectService.deleteProject(currentId).subscribe(data => {
    if (data.toString() == "1") {
      this.msg = "Data deleted successfully";
      this.loadProjects();
      this.projectFrm.reset();
    }
    else {
      this.msg = "Error in deleting data";
    }
  }, error => this.msg = <string>error);
  
  this.btnProjectTitle = "Add Project";
}
resetForm(){
  this.msg="";
  this.projectFrm.reset();
}
onProjectSubmit(formData: any) {    

  let projectData:ProjectModel =new ProjectModel();
  if(formData.value.startDate)
  projectData.startDate = new Date(formData.value.startDate.formatted);
  if(formData.value.endDate)
  projectData.endDate = new Date(formData.value.endDate.formatted);
  projectData.project_Id = formData.value.project_Id;
  projectData.project = formData.value.project;
  projectData.managerId = formData.value.managerId;
  projectData.priority = formData.value.priority;

  if(this.projectFrm.valid){
  if (this.btnProjectTitle == "Add Project") {
    console.log(formData.value);
    this.projectService.addProject(projectData).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data Added successfully";
        this.loadProjects();
        this.projectFrm.reset();
      }
      else {
        this.msg = "Error in saving data";
      }
    }, error => this.msg = <string>error);
  }
  else if (this.btnProjectTitle == "Edit Project") {
    this.projectService.editProject(projectData).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data Saved successfully";
        this.loadProjects();
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
 
  this.btnProjectTitle = "Add Project";
}
direction: number;
sort(property) {
  this.isDesc = !this.isDesc; //change the direction    
  this.column = property;
  this.direction = this.isDesc ? 1 : -1;
};
}
