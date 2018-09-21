import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './model/user';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    this.userFrm = this.fb.group({ firstName: [''], lastName: [''], employeeId: [''], id: [''] });
    this.btnTitle = "Add User";
    this.loadUsers();
  }
  loadUsers() {
    
    this.userService.getUsers().subscribe(users => { this.users = users; });
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
        this.userFrm.reset();
      }
      else {
        this.msg = "Error in deleting data";
      }
    }, error => this.msg = <string>error);
    this.loadUsers();
    this.btnTitle = "Add User";
  }
  onSubmit(formData: any) {
    
    if (this.btnTitle == "Add User") {
      this.userService.addUser(formData.value).subscribe(data => {
        if (data.toString() == "1") {
          this.msg = "Data Added successfully";
          this.userFrm.reset();
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
        }
        else {
          this.msg = "Error in updating data";
        }
      }, error => this.msg = <string>error);
    }
    this.loadUsers();
    this.btnTitle = "Add User";
  }
  direction: number;
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
}
