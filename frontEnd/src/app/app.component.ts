import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ILogoutRequest } from './shared/interfaces/auth/logout-request';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  is_logged_in: boolean = false;
  timerSubscription: Subscription;

  constructor(private authService: AuthService, private router:Router)
  {
  
  }
}