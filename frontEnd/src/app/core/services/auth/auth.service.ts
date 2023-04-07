import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRegisterRequestInput } from 'src/app/shared/interfaces/auth/register-request';
import { IAuthRequestInput } from 'src/app/shared/interfaces/auth/login-request';
import { ILogoutRequest } from 'src/app/shared/interfaces/auth/logout-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  register(data :IRegisterRequestInput): Observable<any>
  {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(environment.baseUrl + 'register', JSON.stringify(data), {'headers':headers})
  }

  login(data :IAuthRequestInput): Observable<any>
  {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(environment.baseUrl + 'login', JSON.stringify(data), {'headers':headers})
  }

  logout(data: ILogoutRequest)
  {
    const token = localStorage.getItem('token')!.toString();

    const headers = { 
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token 
    }
    
    return this.http.post(environment.baseUrl + 'logout', JSON.stringify(data), {'headers':headers})
  }
}
