import { PlanetService } from './services/planet.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchPlanetComponent } from './search-planet/search-planet.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { NumberSpecificPipe } from './planet-list/number.pipe';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchPlanetComponent,
    PlanetListComponent,
    NumberSpecificPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent,canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'search-planet', component: SearchPlanetComponent,canActivate: [AuthGuard]  },
      // otherwise redirect to home
      { path: '**', redirectTo: '',canActivate: [AuthGuard]  }
    ])
  ],
  providers: [
    PlanetService,

    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
