import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RutasService} from '../../services/rutas.service';
import {Ruta} from '../../interfaces/interfaces';
import {DatePipe} from '@angular/common';
import {LoadingController} from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-mostrar-ruta',
  templateUrl: './mostrar-ruta.page.html',
  styleUrls: ['./mostrar-ruta.page.scss'],
})
export class MostrarRutaPage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', {static: true}) mapNativeElement: ElementRef;
  ruta = {
    _id: '',
    origen: '',
    paradas: [],
    destino: '',
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    contacto: '',
    imagen: '',
    publicado: false
  };
  waypts = [];
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(private activatedRoute: ActivatedRoute,
              private rutasService: RutasService,
              private datePipe: DatePipe,
              private loadingController: LoadingController) { }

  ngOnInit() {}
  ionViewWillEnter() {
    this.loadData();
  }
  loadData() { // Carga la informacion de la ruta
    const idRuta = this.activatedRoute.snapshot.paramMap.get('idRuta');
    this.rutasService.getRuta(idRuta).subscribe(r => {
      this.ruta = r;
      this.calculateAndDisplayRoute();
    });
  }
  // Genera la ruta para mostrarla en formato mapa
  createWayoints() {
    for (let i = 0; i < this.ruta.paradas.length; i++) {
      this.waypts.push({
        location: this.ruta.paradas[i],
        stopover: true
      });
    }
  }
  setMap() {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 12,
      center: {lat: 39.469, lng: -0.377}
    });
    this.directionsDisplay.setMap(map);
  }
  ngAfterViewInit(): void {
    this.setMap();
  }
  async calculateAndDisplayRoute() {
    const loading = await this.loadingController.create({
      spinner: 'dots'
    });
    loading.present();
    const that = this;
    this.createWayoints();
    if (this.ruta.paradas.length !== 0) {
        this.directionsService.route({
          origin: this.ruta.destino,
          destination: this.ruta.origen,
          waypoints: this.waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === 'OK') {
            console.log(response);
            that.directionsDisplay.setDirections(response);
          }
        });
      } else {
        this.directionsService.route({
          origin: this.ruta.destino,
          destination: this.ruta.origen,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === 'OK') {
            console.log(response);
            that.directionsDisplay.setDirections(response);
          }
        });
      }
    loading.dismiss();
    }
}
