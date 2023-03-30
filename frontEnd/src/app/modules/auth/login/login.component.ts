import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IAuthRequestInput } from 'src/app/core/interfaces/auth/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  submitForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  loginUser() {
    let loginInput: IAuthRequestInput = { email:this.submitForm.value.email, password: this.submitForm.value.password };
    this.authService.login(loginInput)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('token', data);
        // localStorage.setItem(‘name’,’Nixon’);
      });
  }
}
