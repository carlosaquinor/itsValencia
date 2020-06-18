import { Component, OnInit } from '@angular/core';
import {RutasService} from '../../services/rutas.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ApuntadoService} from '../../services/apuntados.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-mostrar-ruta-user',
  templateUrl: './mostrar-ruta-user.page.html',
  styleUrls: ['./mostrar-ruta-user.page.scss'],
})
export class MostrarRutaUserPage implements OnInit {

  constructor(private rutasService: RutasService,
              private datePipe: DatePipe,
              private router: Router,
              private authService: AuthService,
              private apuntadoService: ApuntadoService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private activatedRoute: ActivatedRoute,
              private toastController: ToastController) { }
  listaRutas = [];
  idUser = '';
  async ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
    });
    loading.present();
    this.listaRutas = [];
    this.rutasService.deleteFecha().subscribe(); // Elimina las rutas que han terminado (fecha)
    this.authService.getProfile().subscribe(p => {
      this.idUser = p._id;
      this.apuntadoService.getApuntadosUser(p._id).subscribe(y => {
      if (this.hayRutasApuntadas(y.length)) { // Saca las rutas a las que esta apuntado el usuario
        this.alertNoHayRutas(); // Muestra alert si no existen rutas
      } else {
      y.forEach(x => {
        this.rutasService.getRuta(x.ruta).subscribe(z => {
          if (z !== null && z !== undefined) { // Me aseguro de que la ruta aun exista y no haya sucedido ya
            this.listaRutas.push(z);
          } else {
            this.apuntadoService.borrarApuntado(x._id).subscribe(); // Borra el apuntado si la ruta ya no existe
          }
        });
      });
      }
    });
    });
    loading.dismiss();
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd h:mm');
    return fechaString;
  }
  abrirRuta(idRuta2: string) {
    this.router.navigate(['/mostrar-info-ruta', {idRuta: idRuta2}]);
  }
  hayRutasApuntadas(lenghtLista: number): boolean {
    return lenghtLista === 0;
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
  async alertNoHayRutas() {
    const alert = await this.alertController.create({
      header: 'No estás apuntado a ninguna ruta',
      backdropDismiss: false,
      message: 'Aquí podras ver las distintas rutas a las que estas inscrito así como desapuntarte de las mismas',
      buttons: [
        {
          text: 'Atrás',
          role: 'cancel',
          handler: (data) => {
            this.router.navigate(['/perfil-usuario']);
          }
        }, {
          text: 'Ver rutas',
          role: 'confirm',
          handler: (data) => {
            this.router.navigate(['/rutas']);
          }
        }
      ]
    });
    await alert.present();
  }
  async alertEliminarRuta(idRuta: string) {
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
            this.rutasService.deleteRuta(idRuta).subscribe(r => {
              this.toastRutaEliminada();
              this.loadData();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async alertEliminarParticipacion(idRuta: string) {
    const alert = await this.alertController.create({
      header: 'Elimiar participación',
      backdropDismiss: false,
      message: 'Estas seguro de que quieres eliminar tu participación en la ruta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            this.eliminarParticipacion(idRuta);
          }
        }
      ]
    });
    await alert.present();
  }
  eliminarParticipacion(idRuta: string) {
    this.authService.getProfile().subscribe(r => {
      this.apuntadoService.getApuntadosUser(r._id).subscribe(y => {
        let idApuntado = '';
        y.forEach(x => {
          if (x.ruta === idRuta) {
            idApuntado = x._id;
          }
        });
        this.apuntadoService.borrarApuntado(idApuntado).subscribe(z => {
          this.loadData();
        });
      });
    });
  }
}
