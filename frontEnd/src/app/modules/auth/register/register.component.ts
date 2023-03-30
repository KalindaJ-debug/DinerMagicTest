import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IRegisterRequestInput } from 'src/app/core/interfaces/auth/register-request';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  registerUser() {
    console.log(this.submitForm.value)
    console.log(this.submitForm.value.email)
    let registerInput: IRegisterRequestInput = { name: this.submitForm.value.name, email:this.submitForm.value.email, password: this.submitForm.value.password };
    
    this.authService.register(registerInput)
      .subscribe(data => {
        console.log(data)
      })      
  }
}
