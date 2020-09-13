import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angularMaterial/angular-material.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { LocationViewComponent } from './location-view/location-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainViewComponent,
    MapViewComponent,
    LocationViewComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
