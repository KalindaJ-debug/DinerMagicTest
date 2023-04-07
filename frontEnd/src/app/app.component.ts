import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ILogoutRequest } from './shared/interfaces/auth/logout-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  is_admin: boolean = false;

  constructor(private authService: AuthService, private router:Router)
  {
    try
    {
      const access_token = localStorage.getItem('access_level')!.toString();
      if (access_token == "admin")
      {
        this.is_admin = true;
      }
    }
    catch(e)
    {
      this.is_admin = false;
    }
  }

  logout()
  { 
    console.log('test')
    let emailInterface: ILogoutRequest = { email: localStorage.getItem('email')!.toString() };
    this.authService.logout(emailInterface).subscribe(res => {
      localStorage.clear();
      this.router.navigate(['/login']);
      // this.toastr.success('User was deleted', 'Successful');
    }, err => {
      // this.toastr.error('Something went wrong', 'Error');
    })

    

    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/auth/login']);
    }
  }   
}