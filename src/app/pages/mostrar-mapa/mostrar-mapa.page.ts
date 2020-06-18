import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
// Esta page se usa para mostrar la ubicación de los distintos sitios
declare var google;
@Component({
  selector: 'app-mostrar-mapa',
  templateUrl: './mostrar-mapa.page.html',
  styleUrls: ['./mostrar-mapa.page.scss'],
})
export class MostrarMapaPage implements OnInit {
  direccion = '';
  nombre = '';
  geocoder = new google.maps.Geocoder();
  constructor(private geolocation: Geolocation, private loadCtrl: LoadingController, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.direccion = this.activatedRoute.snapshot.paramMap.get('dir');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.loadMap();
  }
  async loadMap() { // Carga el mapa del lugar
    const loading = await this.loadCtrl.create({
      spinner: 'dots'
    });
    loading.present();
    const rta = await this.geolocation.getCurrentPosition();
    const mapElement: HTMLElement = document.getElementById('map');
    this.geocoder.geocode( { address: this.direccion}, result => {
    const map = new google.maps.Map(mapElement, {
      center : result[0].geometry.location,
      zoom: 15
    });
    google.maps.event.addListenerOnce(map, 'idle', () => { // Establece el marcador en la direccion
      loading.dismiss();
      const marker = new google.maps.Marker({
            position: result[0].geometry.location,
            zoom: 12,
            map,
            title: this.nombre,
            bounce: true
          });
      });
    });
  }

}
