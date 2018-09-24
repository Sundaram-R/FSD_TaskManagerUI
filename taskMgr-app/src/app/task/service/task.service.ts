import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { TaskModel } from '../model/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskModel[];
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/task";
  constructor(private http: Http) { }
  addTask(task: TaskModel) {
    return this.http.post(this.genericUrl, task).pipe(map((response: Response) => response.json()));
  }
  editTask(task: TaskModel) {

    return this.http.put(this.genericUrl, task).pipe(map((response: Response) => response.json()));
  }
  deleteTask(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: Response) => response.json()));
  }
  getTasks() {
    return this.http.get(this.genericUrl).pipe(map((response: Response) => response.json()));
  }
  getTask(id: number) {
    return this.http.get(this.genericUrl+"\\"+id).pipe(map((response: any) => response.json()));
  }
}
