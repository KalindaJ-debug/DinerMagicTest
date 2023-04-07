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
    const token = localStorage.getItem('token')!.toString();
    
    const headers = { 
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token 
    }
    return this.http.get(environment.baseUrl + 'user/view', {'headers':headers})
  }

  createUser(data: IUserCreate): Observable<any>
  {
    console.log(data)
    const token = localStorage.getItem('token')!.toString();

    const headers = { 
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token 
    }

    return this.http.post(environment.baseUrl + 'user/add', JSON.stringify(data), {'headers':headers})
  }
}
