import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnChanges {
  @Input()planetList:Array<Object>;
  constructor() { }

  ngOnChanges() {
    $(function() {
      $(".dial").dial({
        'fgColor':'black'
      });
  });
  }

}
