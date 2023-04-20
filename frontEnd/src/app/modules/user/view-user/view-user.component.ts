import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ILogoutRequest } from 'src/app/shared/interfaces/auth/logout-request';
import { IUserModel } from 'src/app/shared/interfaces/user/user-model';
import { IUserUpdateList } from 'src/app/shared/interfaces/user/user-update-list';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  userArray: Array<IUserModel> = [];
  access_token = localStorage.getItem('access_level')!.toString();
  is_admin: boolean = false;
  update_open = false;
  userData: IUserModel;
  updateUserId: number;
  is_logged_in: boolean = false;

  ngOnInit(): void {
  }

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private authService: AuthService)
  {
    const access_level = localStorage.getItem('access_level')!.toString();
    if (access_level == "admin")
    {
      this.is_admin = true;
    }
    this.createUserArray();
  }

  private createUserArray()
  {
    const getUserList: IUserUpdateList = {selection: "name"}

    this.userService.updatedList(getUserList).subscribe(res => {
      for (let user of res.data) {
        let userData:IUserModel = user;
        this.userArray.push(userData);
        // this.filterApprovedBy()
      }
    }, err => {
      this.toastr.error('You can not view this page', 'Error');
    })
  }

  searchUsers(selection: string)
  {
    const getUserList: IUserUpdateList = {selection: selection}
    
    this.userService.updatedList(getUserList).subscribe(res => {
      console.log(res)
      for (var user of res.data) {
        let userData:IUserModel = user;
        this.userArray.push(userData);
      }
    }, err => {
      this.toastr.error('You can not view this page', 'Error');
    })
  }

  // private filterApprovedBy()
  // {
  //   const emailReference = localStorage.getItem('email')!.toString();

  //   const indexOfObject = this.userArray.findIndex((object) => {
  //     return object.access_level == "customer" && object.created_by !== emailReference;
  //   });
     
  //   if (indexOfObject !== -1) {
  //     this.userArray.splice(indexOfObject, 1);
  //   }
  // }

  updateUser(id: any)
  {
    this.userData = this.userArray.find(element => element.id == id)!;
    this.updateUserId = id;
    this.update_open = true;
  }

  updateDataTest(item:boolean)
  {
    this.update_open = false;
  }

  deleteUser(id: any)
  {
    this.userService.deleteUser(id).subscribe(res => {
      this.toastr.success('User was deleted', 'Successful');
      this.createUserArray();
    }, err => {
      this.toastr.error('Something went wrong', 'Error');
    })
  }
}
