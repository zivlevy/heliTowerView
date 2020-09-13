import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  getMenuStatus$() {
    return this.menuOpen$.asObservable();
  }

  menuState(state: boolean) {
    this.menuOpen$.next(state);
  }
}
