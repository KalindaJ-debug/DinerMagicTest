import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IRegisterRequestInput } from 'src/app/shared/interfaces/auth/register-request';
import { IUserCreate } from 'src/app/shared/interfaces/user/user-create';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  submitForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.intialiseForm();
  }

  addUser() {
    const addUserInput:IUserCreate = this.submitForm.value;

      this.userService.createUser(addUserInput)
      .subscribe(res => {
        this.toastr.success('Successful added', 'Welcome');
        this.router.navigate(['view_user']);
      }, err => {
        if (err.status == 403 || err.status == 401)
        {
          this.toastr.warning('You will be redirected', 'Forbidden Action');
          this.router.navigate(['view_user']);
        }
        else if (err.status == 500)
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
