import { Component, OnInit } from '@angular/core';
import {LocationsService} from '../services/locations.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isOn = true;
  constructor(private locationsService: LocationsService) { }

  ngOnInit() {
  }

  toggleGet() {
    this.isOn = !this.isOn;
    if (this.isOn) {
      this.locationsService.startLocationGet();
    } else {
      this.locationsService.stopLocationGet();
    }
  }



}
