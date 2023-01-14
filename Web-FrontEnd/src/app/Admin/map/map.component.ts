import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Localisation } from 'src/app/model/declaration/localisation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input()
  localisation!: Localisation;

  @Input()
  description!: String;
  map: any;

  smallIcon = new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  constructor() {}

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const parcThabor = {
      lat: this.localisation.latitude,
      lng: this.localisation.longitude,
    };

    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [parcThabor.lat, parcThabor.lng],
      zoom: zoomLevel,
    });

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 12,
        maxZoom: 17,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    mainLayer.addTo(this.map);
    const descriptionWikipedia = this.description + '';
    const popupOptions = {
      coords: parcThabor,
      text: descriptionWikipedia,
      open: true,
    };
    this.addMarker(popupOptions);
  }

  addMarker({
    coords,
    text,
    open,
  }: {
    coords: { lat: number; lng: number };
    text: string;
    open: boolean;
  }) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.map).bindPopup(text);
    }
  }
}
