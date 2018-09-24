import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from "rxjs/operators";

import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/user";
  constructor( private http:Http) { }
  addUser(user: User) {
    return this.http.post(this.genericUrl, user).pipe(map((response: Response) => response.json()));
  }
  editUser(user: User) {

    return this.http.put(this.genericUrl, user).pipe(map((response: Response) => response.json()));
  }
  deleteUser(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: Response) => response.json()));
  }
  getUsers() {
    return this.http.get(this.genericUrl).pipe(map((res: Response) => res.json()));
  }
  getUser(id: number) {
    return this.http.get(this.genericUrl+"\\"+id).pipe(map((response: any) => response.json()));
  }
}
