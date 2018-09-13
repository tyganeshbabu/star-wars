import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class PlanetService {
  constructor() {
  }

  getPlanets(url, planets, resolve, reject) {
    axios.get(url)
    .then(response => {
      const retrivedPlanets = planets.concat(response.data.results)
      if (response.data.next !== null) {
        this.getPlanets(response.data.next, retrivedPlanets, resolve, reject)
      } else {
        resolve(retrivedPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
  }
}
