import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IAuthRequestInput } from 'src/app/core/interfaces/auth/login-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitForm: FormGroup; 

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intialiseForm()
  }

  loginUser() {
    let loginInput: IAuthRequestInput = this.submitForm.value;
    this.authService.login(loginInput)
      .subscribe(data => {
        localStorage.setItem('token', data);
        this.toastr.success('Hello world!', 'Toastr fun!');
        // localStorage.setItem(‘name’,’Nixon’);
      });
  }

  private intialiseForm()
  {
    this.submitForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
}
