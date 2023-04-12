import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ILogoutRequest } from './shared/interfaces/auth/logout-request';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  is_logged_in: boolean = false;
  timerSubscription: Subscription;
  subscription: Subscription;
  interval:any = 0;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.is_logged_in = this.authService.getLoginStatus();
    }, 1000);
  }
  
  constructor(private authService: AuthService, private router:Router)
  {
    
  }

  logout()
  { 
    let emailInterface: ILogoutRequest = { email: localStorage.getItem('email')!.toString() };
    
    this.authService.logout(emailInterface).subscribe(res => {
      localStorage.clear();
      this.authService.updateLoginStatus(false);
      this.router.navigate(['/login']);
      // window.location.reload();
    }, err => {
      
    })
  }   

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}