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
  is_logged_in: boolean = false;

  constructor(private http: HttpClient) { }

  register(data :IRegisterRequestInput): Observable<any>
  {
    return this.http.post(environment.baseUrl + 'register', JSON.stringify(data))
  }

  login(data :IAuthRequestInput): Observable<any>
  {
    return this.http.post(environment.baseUrl + 'login', JSON.stringify(data))
  }

  logout(data: ILogoutRequest)
  {
    return this.http.post(environment.baseUrl + 'logout', JSON.stringify(data))
  }

  updateLoginStatus(status: boolean)
  {
    this.is_logged_in = status;
  }

  getLoginStatus()
  {
    return this.is_logged_in;
  }
}
