import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RutasService} from '../../services/rutas.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {ApuntadoService} from '../../services/apuntados.service';


@Component({
  selector: 'app-mostrar-info-ruta',
  templateUrl: './mostrar-info-ruta.page.html',
  styleUrls: ['./mostrar-info-ruta.page.scss'],
})
export class MostrarInfoRutaPage implements OnInit {
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
    idusuario: '',
    publicado: false
  };
  cantApuntados = 0;
  idUser = '';
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private rutasService: RutasService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private toastController: ToastController,
              private alertController: AlertController,
              private aputnadosService: ApuntadoService,
              private loadingController: LoadingController) { }

  async ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  async loadData() { // Carga la ruta en base al id que se le pasa
    const loading = await this.loadingController.create({
      spinner: 'dots',
    });
    loading.present();
    const idRuta = this.activatedRoute.snapshot.paramMap.get('idRuta');
    this.rutasService.getRuta(idRuta).subscribe(r => {
      this.ruta = r;
    }); // Cantidad de apuntados que tiene la ruta
    this.aputnadosService.getApuntadosRuta(idRuta).subscribe(r => {
      this.cantApuntados = r.length;
    });
    if (this.authService.loggedIn()) { // Saca el perfil si el user esta logeado
      this.authService.getProfile().subscribe( r => {
        this.idUser = r._id;
      });
    }
    loading.dismiss();
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd h:mm');
    return fechaString;
  }
  abrirRuta(idRuta2: string) { // Mapa de la ruta
    this.router.navigate(['/mostrar-ruta', {idRuta: idRuta2}]);
  }
  puedeInscribirse() { // Calcula si el usuer esta logeado o si ya esta apuntado antes de mostrar el alert
    if (this.authService.loggedIn()) {
      let puedeInscribirse = true;
      this.aputnadosService.getApuntadosRuta(this.ruta._id).subscribe(r => {
        this.authService.getProfile().subscribe(y => {
          r.forEach(x => {
            if (x.usuario === y._id) {
              puedeInscribirse = false;
            }
          });
          if (puedeInscribirse) {
            this.mostrarAlert();
          } else {
            this.toastYaInscrito();
          }
        });
      });
    } else {
      this.toastNotLogged();
      this.router.navigate(['/login']);
    }
  }
  async toastNotLogged() {
    const toast = await this.toastController.create({
      message: 'Has de iniciar sesión antes de inscribirte en una ruta',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  mostrarAlert() {
    this.alertInscribirseRuta();
    this.aputnadosService.getApuntadosRuta(this.ruta._id).subscribe(r => {
      this.cantApuntados = r.length;
    });
  }
  async toastYaInscrito() {
    const toast = await this.toastController.create({
      message: 'Ya estas inscrito en esta ruta',
      position: 'bottom',
      duration: 1000,
      color: 'warning'
    });
    toast.present();
  }
  async toastInscritoCorrectamente() {
    const toast = await this.toastController.create({
      message: 'Inscripción completada con éxito',
      position: 'bottom',
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }
  async toastRutaEliminada() {
    const toast = await this.toastController.create({
      message: 'Ruta eliminada con éxito',
      position: 'bottom',
      duration: 1000,
      color: 'warning'
    });
    toast.present();
  }
  async alertInscribirseRuta() { // Pide contacto al usuario antes de apuntarlo
    const alert = await this.alertController.create({
      header: 'Confirmar la inscripción',
      backdropDismiss: false,
      inputs: [
        {
          name: 'tel',
          type: 'text',
          placeholder: 'Introduce un teléfono de contacto...'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            this.authService.getProfile().subscribe(r => { // Crea un apuntado con el contacto proveeido
              const apuntado = {
                nombre: r.nombre,
                apellido: r.apellido,
                contacto: data.tel,
                ruta: this.ruta._id,
                usuario: r._id
              };
              this.aputnadosService.crearApuntado(apuntado).subscribe(x => {
                this.router.navigate(['/rutas']);
                this.toastInscritoCorrectamente();
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async alertEliminarRuta() {
    const alert = await this.alertController.create({
      header: 'Eliminar la ruta',
      message: 'Eres el anfitrión de esta ruta, estás seguro de que la quieres eliminar?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            this.rutasService.deleteRuta(this.ruta._id).subscribe(r => {
              this.router.navigate(['/rutas']);
              this.toastRutaEliminada();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
