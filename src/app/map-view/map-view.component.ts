import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../services/map-service';
import * as mapboxgl from 'mapbox-gl';
import {LocationsService} from '../services/locations.service';
import {LocationItem} from '../model/location.model';
import {FeatureCollection, GeoJsonPoint} from '../model/geojson';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  map: mapboxgl.Map;
  isMapLoaded = false;
  constructor(private mapService: MapService,
              private locationsService: LocationsService) {


  }

  ngOnInit() {
    // init map
    this.initMap();
    this.locationsService.getLocations$().subscribe(locations => {

      this.drawTrafficLayer(locations);

    });
  }

  initMap() {
    setTimeout(() => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/zivlevy/ckey19acw0ors19qwjw5h0gqd',
        zoom: 10.0,
        center: [34.6, 31.4]
      });
      this.map.on('load', () => {
        this.isMapLoaded = true;
        this.map.resize();

        // add helicopter and aircraft icons
        this.map.loadImage(
          '../../assets/images/helicopter.png',
          (error, image) => {
            if (error) {
              throw error;
            }
            this.map.addImage('hl', image);

          });

        this.map.loadImage(
          '../../assets/images/airplane.png',
          (error, image) => {
            if (error) {
              throw error;
            }
            this.map.addImage('ac', image);

          });
      });
    });

  }

  // TRAFFIC LAYER
  drawTrafficLayer(trafficArray: LocationItem[]) {
    if (!this.map) {
      return;
    }
    const trafficArr = [];
    // create GEOJson
    for (const traffic of trafficArray) {
      // create geoJson item for each traffic
      const coordinates = [traffic.lng, traffic.lat];
      const trafficJson = new GeoJsonPoint(coordinates, {...traffic});
      trafficArr.push(trafficJson);
    }

    const featureCollection = new FeatureCollection(trafficArr);
    if (this.map.getSource('traffic') === undefined) {
      this.map.addSource('traffic', {
        type: 'geojson',
        data: featureCollection
      });

      this.map.addLayer({
        id: 'traffic',
        type: 'symbol',
        source: 'traffic',
        layout: {
          'icon-image': ['get', 'type'],
          'icon-allow-overlap': true,
          'icon-rotate': ['get', 'heading'],
          'icon-size': {
            base: 1,
            stops: [[1, 0.0], [10, 0.2], [22, 0.5]]
          },
          'text-field': ['get', 'callsign'],
          'text-allow-overlap': true,
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
          ],
          'text-offset': [0, 0.5],
          'text-anchor': 'top',
          'text-size': {
            base: 1,
            stops: [[1, 0] , [9.99 , 0] , [10, 16], [22, 32]]
          }
        },
        paint: {
          'text-color' : ['get', 'timeColor']
        }

      });
    } else {
      this.map.getSource('traffic').setData(featureCollection);
    }
  }

}
