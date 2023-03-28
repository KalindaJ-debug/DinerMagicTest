import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "http://127.0.0.1:8000/api/";
  
  constructor(private http: HttpClient) { }

  register(data:NgForm): Observable<any>
  {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.baseURL + 'register', JSON.stringify(data), {'headers':headers})
  }

  login(data:NgForm): Observable<any>
  {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.baseURL + 'login', JSON.stringify(data), {'headers':headers})
  }
}
