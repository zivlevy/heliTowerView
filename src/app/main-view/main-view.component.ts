import { Component, OnInit } from '@angular/core';
import {LocationsService} from '../services/locations.service';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
locations: Location[] = [];
menuState = false;
  constructor(private locationService: LocationsService,
              private menuService: MenuService) {
    this.locationService.getLocations$()
      .pipe()
      .subscribe(locations => {
        console.log ('================');
        console.log(locations);
      });

    this.menuService.getMenuStatus$()
      .pipe()
      .subscribe(menuState => this.menuState = menuState);
  }

  ngOnInit() {
  }

}
