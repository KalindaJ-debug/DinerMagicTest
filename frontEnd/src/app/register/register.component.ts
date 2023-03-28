import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  // getFormData(data:NgForm)
  // {
  //   console.warn(data);
  //   postBody = JSON.stringify(data)
  // }dvsvdsvdvdvvdsvsdbdbd

  
  registerUser(data:NgForm) {
    this.apiService.register(data)
      .subscribe(data => {
        console.log(data)
      })      
  }

}
