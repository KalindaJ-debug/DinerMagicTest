import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NgForm, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IAuthRequestInput } from 'src/app/shared/interfaces/auth/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.intialiseForm()
  }

  loginUser() {
    let loginInput: IAuthRequestInput = this.submitForm.value;
    this.authService.login(loginInput)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', loginInput.email);
        localStorage.setItem('access_level', res.access_level);
        this.toastr.success('Successful Login', 'Welcome User');
        this.route.navigate(['view_user']);
      }, err => {
        this.toastr.error('Unsuccessful Login', 'Please try again');
      });
  }

  private intialiseForm() {
    this.submitForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
}
