import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthService {
  url = 'https://swapi.co';
  currentUser: any; 

  constructor(private http: HttpClient) {
    
  }

  retrieveToken() {
    let token = localStorage.getItem('token');
    if (token) {
      this.currentUser = JSON.parse(atob(token));
      return this.currentUser;
    }
  }

  login(credentials) { 
    
   return this.http.get(this.url+'/api/people/?search='+credentials.name)
    .map(response => {
      // Allow exact username
      if (response['count'] === 1) {
        //Check whether credentials match with return username; This will not allow users to enter half typed names;
        if (response['results'][0]['name'] === credentials.name) {
          if (credentials.password === response['results'][0]['birth_year']) {
            let tokenObj = {
                username: response['results'][0]['name'],
                token: response['results'][0]['name'] + '_' + response['results'][0]['birth_year'],
                admin: (response['results'][0]['name'] === 'Luke Skywalker') ? true:false
            };
            localStorage.setItem('token', btoa(JSON.stringify(tokenObj)));
            return true;
          }
        } 
      }
      return false;
    });
  }

  logout() { 
    localStorage.removeItem('token');
    this.currentUser = null;
    window.location.href="/";
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}

