import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {LocationsService} from '../services/locations.service';
import {takeUntil} from 'rxjs/operators';
import {LocationItem} from '../model/location.model';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  locations: LocationItem[] = [];
  currentTime: number;

  constructor(private locatiosService: LocationsService) {
    this.locatiosService.getLocations$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(locations => {
        this.locations = locations.sort((a: LocationItem, b: LocationItem) => {
          if (a.callsign < b.callsign) {
            return -1;
          }
          if (a.callsign > b.callsign) {
            return 1;
          }
          return 0;
        });

      });

    timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.currentTime = new Date().getTime());
  }

  ngOnInit() {
  }

  remove(id: string) {
    this.locatiosService.deleteLocation(id);
  }

  ngOnDestroy() {
    // force unsubscribe
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
