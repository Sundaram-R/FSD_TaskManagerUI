import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from "rxjs/operators";

import { ProjectModel } from '../model/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/project";
  constructor( private http:Http) { }
  addProject(user: ProjectModel) {
    return this.http.post(this.genericUrl, user).pipe(map((response: Response) => response.json()));
  }
  editProject(user: ProjectModel) {

    return this.http.put(this.genericUrl, user).pipe(map((response: Response) => response.json()));
  }
  deleteProject(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: Response) => response.json()));
  }
  getProjects() {
    return this.http.get(this.genericUrl).pipe(map((res: Response) => res.json()));
  }
  getProject(id: number) {
    return this.http.get(this.genericUrl+"\\"+id).pipe(map((response: any) => response.json()));
  }
}
