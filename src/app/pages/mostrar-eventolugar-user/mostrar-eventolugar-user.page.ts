import { Component, OnInit } from '@angular/core';
import {LugaresService} from '../../services/lugares.service';
import {AuthService} from '../../services/auth.service';
import {EventosService} from '../../services/eventos.service';
import {AlertController, IonSlides} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mostrar-eventolugar-user',
  templateUrl: './mostrar-eventolugar-user.page.html',
  styleUrls: ['./mostrar-eventolugar-user.page.scss'],
})
export class MostrarEventolugarUserPage implements OnInit {
  listaLugares = [];
  listaEventos = [];
  constructor(private lugaresService: LugaresService,
              private authService: AuthService,
              private eventosService: EventosService,
              private datePipe: DatePipe,
              private router: Router,
              private alertController: AlertController) { }
  segmento = 0;
  selectedSlide: any;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  // Gestion del slide y el segmento
  async segmentoCambiao(ev) {
    await this.selectedSlide.slideTo(this.segmento);
  }
  async slideCambiado(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(index => {
      this.segmento = index;
    });
  }
  // Cargar datos (Tanto lugares como eventos sugeridos por el usuario)
  loadData() {
    this.authService.getProfile().subscribe(r => {
      this.lugaresService.getLugaresPorIdUsuario(r._id).subscribe(t => {
        this.listaLugares = t;
        this.eventosService.getEventosPorIdUsuario(r._id).subscribe(z => {
       this.listaEventos = z;
       if (this.listaEventos.length === 0 && this.listaLugares.length === 0) {
            this.alertNoHayLugaresEventos(); // Si no hay, manda aviso
          }
      });
      });
    });
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return fechaString;
  }
  mostrarLugar(id: string) {
    this.router.navigate(['/mostrar-lugar', {idLugar: id}]);
  }
  async alertPendienteRevision(nombre: string) { // Alert que se muestra si no se ha verificado
    const alert = await this.alertController.create({
      header: 'Confirmación pendiente',
      backdropDismiss: false,
      message: 'Tu solicitud sobre "' + nombre + '" se encuentra en revisión.',
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
  async alertNoHayLugaresEventos() {
    const alert = await this.alertController.create({
      header: 'No has realizado ninguna sugerencia aún',
      backdropDismiss: false,
      message: 'Aquí podras ver las distintas sugerencias que realices, así como su estado de publicación',
      buttons: [
        {
          text: 'Atrás',
          role: 'cancel',
          handler: (data) => {
            this.router.navigate(['/perfil-usuario']);
          }
        }, {
          text: 'Haz tu sugerencia',
          role: 'confirm',
          handler: (data) => {
            this.router.navigate(['/informacion']);
          }
        }
      ]
    });
    await alert.present();
  }

}
