import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: any;
  constructor(private authService: AuthService, private router:Router) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
  }
}
