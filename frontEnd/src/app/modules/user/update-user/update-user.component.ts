import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUserCreate } from 'src/app/shared/interfaces/user/user-create';
import { IUserModel } from 'src/app/shared/interfaces/user/user-model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  
  @Input() userId: number;
  @Input() userData: IUserModel;
  @Output() updateDataEvent= new EventEmitter<boolean>();
  submitForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.intialiseForm();
  }

  updateUser() {
    const addUserInput:IUserCreate = this.submitForm.value;
      this.userService.updateUser(addUserInput, this.userId)
      .subscribe(res => {
        window.location.reload();
        this.toastr.success('User was updated', 'User Updated');
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
      name: new FormControl(this.userData.name, Validators.required),
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      access_level: new FormControl(this.userData.access_level, Validators.required)
    });
  }

  closeComponent()
  {
    this.updateDataEvent.emit(true)
  }
}
