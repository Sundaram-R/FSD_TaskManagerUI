import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  users : User[];
  selectedRow : Number;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  loadUsersToSelect() {
    //return this.users= this.userService.getUsers();
};
setClickedRow(index){
  
this.selectedRow=index.id;
}
}
