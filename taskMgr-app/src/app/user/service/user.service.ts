import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Observable<User[]>;
  
  genericUrl: string = "http://localhost/TaskManagerWebAPI/api/user";
  constructor(private http: HttpClient) { }
  addUser(user: User) {
    return this.http.post(this.genericUrl, user).pipe(map((response: HttpResponse<number>) => response));
  }
  editUser(user: User) {

    return this.http.put(this.genericUrl, user).pipe(map((response: HttpResponse<number>) => response));
  }
  deleteUser(id: number) {

    return this.http.delete(this.genericUrl+"\\" + id).pipe(map((response: HttpResponse<number>) => response));
  }
  getUsers() {
    debugger;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<User[]>(this.genericUrl,{headers});
  }
  getUser(id: number) {
    return this.http.get(this.genericUrl+"\\"+id).pipe(map((response: any) => response.json()));
  }
}
