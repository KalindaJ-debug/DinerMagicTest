import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  loginUser(data:NgForm) {
    this.authService.login(data)
      .subscribe(data => {
        console.log(data);
        // localStorage.setItem(‘name’,’Nixon’);
      })      
  }
}
