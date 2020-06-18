import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {RutasService} from '../../services/rutas.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApuntadoService} from '../../services/apuntados.service';

declare var google;
@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})
export class CrearRutaPage implements OnInit, AfterViewInit {
  formularioRutas: FormGroup;
  @ViewChild('mapElement', {static: true}) mapNativeElement: ElementRef;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  paradas: any = [];
  waypts = [];
  fechaActualRAW: any;
  constructor(private alertController: AlertController, private router: Router,
              private toastController: ToastController, private authService: AuthService,
              private rutasService: RutasService, private formBuilder: FormBuilder,
              private apuntadoService: ApuntadoService) { this.crearFormulario(); }

  ngOnInit() {
  }
  ionViewWillEnter() { // Carga de datos
    this.fechaAcutal();
    this.paradas = [];
    }
  fechaAcutal() {
    this.fechaActualRAW = new Date().toISOString(); // Calcula la fecha del momento que se abre para calcular el minimo al crear la ruta
  }
  Add(parada: string) {
    this.paradas.push(parada);
    this.calculateAndDisplayRoute();
  }
  createWayoints() { // Crea las paradas
    for(let i = 0; i < this.paradas.length; i++) {
      this.waypts.push({
        location: this.paradas[i],
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
  resetearFormulario() {
    this.formularioRutas.reset({
      origen: '',
      destino: '',
      imagen: '',
      titulo: '',
      descripcion: '',
      contacto: '',
      idusuario: '',
      publicado: false,
    });
  }
  cancelar() {
    this.resetearFormulario();
    this.router.navigate(['/rutas']);
  }
  calculateAndDisplayRoute() {
    if (this.formularioRutas.get('origen').value !== '' && this.formularioRutas.get('destino').value !== '') {
      const that = this;
      this.createWayoints();
      if (this.paradas.length !== 0) {
        this.directionsService.route({
          origin: this.formularioRutas.get('origen').value,
          destination: this.formularioRutas.get('destino').value,
          waypoints: this.waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === 'OK') {
            console.log(response);
            that.directionsDisplay.setDirections(response);
          }
          if (status === 'NOT_FOUND') {
            this.formularioRutas.get('origen').setValue('');
            this.formularioRutas.get('destino').setValue('');
            this.paradas = [];
            this.waypts = [];
            this.toastParadasNoValida();
          }
          if (status === 'ZERO_RESULTS') {
            this.formularioRutas.get('origen').setValue('');
            this.formularioRutas.get('destino').setValue('');
            this.paradas = [];
            this.waypts = [];
            this.toastParadasNoValida();
          }
        });
      } else {
        this.directionsService.route({
          origin: this.formularioRutas.get('origen').value,
          destination: this.formularioRutas.get('destino').value,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if (status === 'OK') {
            console.log(response);
            that.directionsDisplay.setDirections(response);
          }
          if (status === 'NOT_FOUND') {
            this.formularioRutas.get('origen').setValue('');
            this.formularioRutas.get('destino').setValue('');
            this.toastDireccionNoValida();
          }
          if (status === 'ZERO_RESULTS') {
            this.formularioRutas.get('origen').setValue('');
            this.formularioRutas.get('destino').setValue('');
            this.toastDireccionNoValida();
          }
        });
      }
    }
  }
  crearParada() {
      this.alertCrearParada();
  }
  crearRuta() {
      if (this.formularioRutas.invalid) {
        return Object.values(this.formularioRutas.controls).forEach(control => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(control2 => control2.markAsTouched());
          } else {
            control.markAsTouched();
          }
        });
      } else {
        this.authService.getProfile().subscribe(x => {
          this.formularioRutas.value.idusuario = x._id;
          this.formularioRutas.value.paradas = this.paradas;
          this.rutasService.crearRuta(this.formularioRutas.value).subscribe(r => {
            console.log(r);
            this.authService.getProfile().subscribe(y => {
              const apuntado = {
                nombre: y.nombre,
                apellido: y.apellido,
                contacto: this.formularioRutas.get('contacto').value,
                ruta: r,
                usuario: y._id
              };
              this.apuntadoService.crearApuntado(apuntado).subscribe(z => {
                this.router.navigate(['/rutas']);
                this.alertRecuerdoConfirmacion()
                this.resetearFormulario();
              });
            });
          });
        });
    }
  }
  // Alerts de las rutas
  async alertCrearParada() {
    const alert = await this.alertController.create({
      header: 'Añadir una parada',
      backdropDismiss: false,
      inputs: [
        {
          name: 'parada',
          type: 'text',
          placeholder: 'Introduce la localización...'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            this.Add(data.parada);
          }
        }
      ]
    });
    await alert.present();
  }
  async alertRecuerdoConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Estamos verificando tu ruta',
      backdropDismiss: false,
      message: 'Por favor, espera a que verifiquemos que todos los datos introducidos sean correctos. ' +
          'Agradecemos su paciencia',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
          }
        }
      ]
    });
    await alert.present();
  }
  async alertEliminarParada(parada: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Estas seguro de que quieres eliminar esta parada?',
      message: parada,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            this.waypts = [];
            for (let z = 0; z < this.paradas.length; z++) {
              if (this.paradas[z] === parada) {
                (this.paradas).splice(z, 1);
              }
            }
            this.calculateAndDisplayRoute();
          }
        }
      ]
    });
    await alert.present();
  }
  async toastParadasNoValida() {
    const toast = await this.toastController.create({
      message: 'Una de las paradas introducidas no es valida',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  async toastDireccionNoValida() {
    const toast = await this.toastController.create({
      message: 'La dirección introducida no es valida',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  // Funciones del formulario
  crearFormulario() {
    this.formularioRutas = this.formBuilder.group({
      origen: new FormControl('', [
        Validators.required
      ]),
      destino: new FormControl('', [
        Validators.required
      ]),
      paradas: new FormControl([]),
      imagen: new FormControl('', [
        Validators.required
      ]),
      titulo: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      fecha: new FormControl('', [
        Validators.required
      ]),
      contacto: new FormControl('', [
        Validators.required
      ]),
      idusuario: new FormControl(''),
      publicado: new FormControl(false)
    });
  }
  get origenNoValido() {
    return this.formularioRutas.get('origen').invalid && this.formularioRutas.get('origen').touched;
  }

  get destinoNoValido() {
    return this.formularioRutas.get('destino').invalid && this.formularioRutas.get('destino').touched;
  }

  get fechaNoValido() {
    return this.formularioRutas.get('fecha').invalid && this.formularioRutas.get('fecha').touched;
  }

  get tituloNoValido() {
    return this.formularioRutas.get('titulo').invalid && this.formularioRutas.get('titulo').touched;
  }

  get descripcionNoValido() {
    return this.formularioRutas.get('descripcion').invalid && this.formularioRutas.get('descripcion').touched;
  }

  get contactoNoValido() {
    return this.formularioRutas.get('contacto').invalid && this.formularioRutas.get('contacto').touched;
  }

  get imagenNoValido() {
    return this.formularioRutas.get('imagen').invalid && this.formularioRutas.get('imagen').touched;
  }

  get puedeCrearParadas() {
    return this.formularioRutas.get('origen').value !== '' && this.formularioRutas.get('destino').value !== '';
  }
}
