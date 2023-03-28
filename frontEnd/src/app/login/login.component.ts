import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  // form!: FormGroup;
  
  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, Validators.required],
    // });
  }

  loginUser(data:NgForm) {
    this.apiService.login(data)
      .subscribe(data => {
        console.log(data);
        // localStorage.setItem(‘name’,’Nixon’);
      })      
  }

}
