import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../model/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: ProjectModel[];
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/project";
  constructor(private http: HttpClient) { }
  addProject(project: ProjectModel) {
    return this.http.post(this.genericUrl, project).pipe(map((response: HttpResponse<number>) => response));
  }
  editProject(project: ProjectModel) {

    return this.http.put(this.genericUrl, project).pipe(map((response: HttpResponse<number>) => response));
  }
  deleteProject(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: HttpResponse<number>) => response));
  }
  getProjects() {
    return this.http.get(this.genericUrl).pipe(map((response: HttpResponse<number>) => <any>response));
  }
  getProject(id: number) {
    return this.http.get(this.genericUrl+id).pipe(map((response: any) => response.json()));
  }
}
