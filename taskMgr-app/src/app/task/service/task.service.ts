import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TaskModel } from '../model/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskModel[];
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/task";
  constructor(private http: HttpClient) { }
  addTask(task: TaskModel) {
    return this.http.post(this.genericUrl, task).pipe(map((response: HttpResponse<number>) => response));
  }
  editTask(task: TaskModel) {

    return this.http.put(this.genericUrl, task).pipe(map((response: HttpResponse<number>) => response));
  }
  deleteTask(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: HttpResponse<number>) => response));
  }
  getTasks() {
    return this.http.get(this.genericUrl).pipe(map((response: HttpResponse<number>) => <any>response));
  }
  getTask(id: number) {
    return this.http.get(this.genericUrl+id).pipe(map((response: any) => response.json()));
  }
}
