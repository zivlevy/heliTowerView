import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {LocationItem} from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locationsCollection: AngularFirestoreCollection<any>;
  locationTimerSubscription;
  currentLocations$: BehaviorSubject<LocationItem[]> = new BehaviorSubject<LocationItem[]>([]);

  constructor(private afs: AngularFirestore) {
    this.locationsCollection = this.afs.collection(
      `locations`,
      ref => ref.orderBy('timestamp')
    );
    this.startLocationGet();
  }

  getLocations$() {
    return this.currentLocations$.asObservable();
  }

  startLocationGet() {
    if (this.locationTimerSubscription) {
      this.locationTimerSubscription.unsubscribe();
    }
    this.locationTimerSubscription =
      timer(0, 1000)
        .pipe(
          switchMap(() => this.locationsCollection.get())
        )
        .subscribe( data => {
          const tempLocations: LocationItem[] = [];
          data.forEach(doc => {
            tempLocations.push(doc.data() as LocationItem);
          });
          this.currentLocations$.next(tempLocations);
        });

  }

  stopLocationGet() {
    this.locationTimerSubscription.unsubscribe();
  }

}
