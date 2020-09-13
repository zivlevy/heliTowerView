import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, timer} from 'rxjs';
import {switchMap, timestamp} from 'rxjs/operators';
import {LocationItem} from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locationsCollection: AngularFirestoreCollection<any>;
  locationTimerSubscription;
  currentLocations$: BehaviorSubject<LocationItem[]> = new BehaviorSubject<LocationItem[]>([]);
  cutOffTime = 5; // minutes
  shortTImeCutOff = 15; // seconds
  medTImeCutOff = 30; // seconds
  longTImeCutOff = 60; // seconds

  constructor(private afs: AngularFirestore) {

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
          switchMap(() => {
            const dateNow = new Date().getTime() ;
            this.locationsCollection = this.afs.collection(
              `locations`,
              ref => ref.orderBy('timestamp', 'desc')
                // .where('timestamp' , '>' ,  (dateNow) - (1000 * 60 * this.cutOffTime)
            );
            return this.locationsCollection.get();
          })
        )
        .subscribe( data => {
          const tempLocations: LocationItem[] = [];
          const currentTime = new Date().getTime();

          data.forEach(doc => {
            const locaionItem = doc.data() as LocationItem;
            const lastSeen = currentTime - locaionItem.timestamp;

            if (lastSeen >  this.shortTImeCutOff * 1000) {
              locaionItem.timeColor = '#04a2da';
              // locaionItem.callsign = locaionItem.callsign + '\n' + Math.floor(lastSeen / 1000);
            }
            if (lastSeen > this.medTImeCutOff * 1000) {
              locaionItem.timeColor = 'red';
            }
            tempLocations.push(locaionItem);
          });
          this.currentLocations$.next(tempLocations);
        });

  }

  deleteLocation(id: string) {
    this.afs.doc('locations/' + id).delete();
  }


  stopLocationGet() {
    this.currentLocations$.next([]);
    this.locationTimerSubscription.unsubscribe();
  }

}
