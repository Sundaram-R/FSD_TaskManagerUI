import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './model/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
  providers: []
})
export class UserComponent implements OnInit {
  isDesc: boolean = false;
  column: string = 'firstName';
  msg: string;
  constructor(private userService: UserService, private fb: FormBuilder) { }

  users: User[];
  user: User;
  userFrm: FormGroup;
  returnValue: number;
  btnTitle: string;
  
  ngOnInit() {
    this.userFrm = this.fb.group({
      firstName: new FormControl({ value: '', Validators: Validators.required }),
      lastName: new FormControl({ value: '', Validators: Validators.required }),
      employeeId: new FormControl({ value: '', Validators: Validators.required }),
      id: ['']
    });
    this.btnTitle = "Add User";
    this.loadUsers();
    this.userFrm.reset();
  }
  loadUsers() {

    this.userService.getUsers().subscribe(users => { this.users = <User[]>users; });
  }
  editUser(currentId: number) {
    this.btnTitle = "Edit User";
    this.user = this.users.filter(x => x.id == currentId)[0];
    this.userFrm.setValue(this.user);
  }
  deleteUser(currentId: number) {
    this.userService.deleteUser(currentId).subscribe(data => {
      if (data.toString() == "1") {
        this.msg = "Data deleted successfully";
        this.loadUsers();
        this.userFrm.reset();
      }
      else {
        this.msg = "Error in deleting data";
      }
    }, error => this.msg = <string>error);
    
    this.btnTitle = "Add User";
  }
  onSubmit(formData: any) {
    if(this.userFrm.valid){
    if (this.btnTitle == "Add User") {

      this.userService.addUser(formData.value).subscribe(data => {
        if (data.toString() == "1") {
          this.msg = "Data Added successfully";
          this.userFrm.reset();
          this.loadUsers();
        }
        else {
          this.msg = "Error in saving data";
        }
      }, error => this.msg = <string>error);
    }
    else if (this.btnTitle == "Edit User") {
      this.userService.editUser(formData.value).subscribe(data => {
        if (data.toString() == "1") {
          this.msg = "Data Saved successfully";
          this.userFrm.reset();
           this.loadUsers();
        }
        else {
          this.msg = "Error in updating data";
        }
      }, error => this.msg = <string>error);
    }
  }
   else{
     this.msg="Invalid Data";
   }
    this.btnTitle = "Add User";
  }
  direction: number;
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
}
