import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Star Wars!';
  constructor(private router:Router, private authService: AuthService) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
  }
}
