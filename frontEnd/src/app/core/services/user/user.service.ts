import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserCreate } from 'src/app/shared/interfaces/user/user-create';
import { IUserModel } from 'src/app/shared/interfaces/user/user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any>
  {
    return this.http.get(environment.baseUrl + 'user/view')
  }

  createUser(data: IUserCreate): Observable<any>
  {
    return this.http.post(environment.baseUrl + 'user/add', JSON.stringify(data))
  }

  updateUser(data: IUserCreate, userId: number) : Observable<any>
  {
    return this.http.put(environment.baseUrl + 'user/update/' + userId, JSON.stringify(data))
  }

  deleteUser(id: any) : Observable<any>
  {
    return this.http.delete(environment.baseUrl + 'user/delete/' + id)
  }
}
