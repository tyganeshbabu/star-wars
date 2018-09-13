import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { Observable, Subscriber } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import { map,debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-planet',
  templateUrl: './search-planet.component.html',
  styleUrls: ['./search-planet.component.css']
})
export class SearchPlanetComponent implements OnInit{
  planetList:Array<Object>;
  loadPlanet:boolean;
  constructor(private planetService: PlanetService) { }
  
  ngOnInit() {
    const searchBox = document.getElementById('typeahead-input');

    //Setting debounce of 1 seconds for allowing user to type
    let inputObs = Observable
        .fromEvent(searchBox, 'keyup')
        .map((x:KeyboardEvent) => x.target['value'])
        .debounceTime(1000)
    inputObs.subscribe(x => this.sendValues(x));
  }

  sendValues(x){
    console.log(x);
    if (x) {
      this.loadPlanet = true;
      // Chaining Data based on axios for getting all data in one call
      let promise = new Promise((resolve, reject) => {
        this.planetService.getPlanets('https://swapi.co/api/planets/?search='+x,[],resolve,reject);
      });
      promise.then((response:Array<Object>)=> {
        console.log(response);
        this.planetList = response;
        this.loadPlanet = false;
      }).catch((error)=>{
        /* potentially some code for generating an error specific message here */
        this.loadPlanet = false;
      });
    } else {
      this.planetList = [];
    }
  }

}
