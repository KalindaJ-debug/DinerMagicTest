import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUserModel } from 'src/app/shared/interfaces/user/user-model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  userArray: Array<IUserModel> = [];
  access_token = localStorage.getItem('access_level')!.toString();
  is_admin: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    const access_token = localStorage.getItem('access_level')!.toString();
    if (access_token == "admin")
    {
      this.is_admin = true;
    }
  }

  constructor(private userService: UserService, private router: Router)
  {
    this.createUserArray();
  }

  createUserArray()
  {
    this.userService.getAll().subscribe(res => {
      for (var user of res.data) {
        let userData:IUserModel = user;
        this.userArray.push(userData);
      }
    }, err => {
     
    })

  }
}
