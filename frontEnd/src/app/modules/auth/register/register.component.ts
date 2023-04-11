import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, NgForm, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IRegisterRequestInput } from 'src/app/shared/interfaces/auth/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intialiseForm();
  }

  registerUser() {
    const registerInput: IRegisterRequestInput = this.submitForm.value;

    this.authService.register(registerInput)
      .subscribe(res => {
        this.toastr.success('Successful registered', 'Welcome');
        this.router.navigate(['login']);
      }, err => {
        if (err.status == 500)
        {
          this.toastr.error('User is already registered', 'Error User');
        }
        else
        {
          this.toastr.error('Unsuccessfully added', 'Error');
        }
      })
  }

  private intialiseForm() {
    this.submitForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      access_level: new FormControl('' , Validators.required)
    });
  }
}
