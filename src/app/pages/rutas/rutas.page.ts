import {Component, OnInit, ViewChild} from '@angular/core';
import {RutasService} from '../../services/rutas.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {IonInfiniteScroll, LoadingController, ToastController} from '@ionic/angular';
import {Lugar} from '../../interfaces/interfaces';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
export class RutasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  constructor(private rutasService: RutasService, private toastController: ToastController, private datePipe: DatePipe,
              private router: Router, private authService: AuthService, private loadingController: LoadingController) { }
  listaRutas: any = [];
  selectcategory = 'asc';
  totalIndice = 0;
  indice = 0;
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  async loadData() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
    });
    loading.present();
    this.infiniteScroll.disabled = false;
    this.listaRutas = [];
    this.rutasService.deleteFecha().subscribe();
    this.saveLista();
    loading.dismiss();
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd h:mm');
    return fechaString;
  }
  abrirRuta(idRuta2: string) {
    this.router.navigate(['/mostrar-info-ruta', {idRuta: idRuta2}]);
  }
  crearRuta() { // Abre la page de crear ruta si el usuario esta conectado
    if (this.authService.loggedIn()) {
    this.router.navigate(['crear-ruta']);
   } else {
       this.toastNotLogged();
       this.router.navigate(['login']);
    }
  }
  async toastNotLogged() {
    const toast = await this.toastController.create({
      message: 'Has de iniciar sesión antes de crear una ruta',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }

  saveLista() { // Saca las rutas que se han verificado
    this.rutasService.getRutas().subscribe(r => {
      const listaRutas = [];
      r.forEach(x => {
        if (x.publicado === true && x.publicado !== undefined) {
          listaRutas.push(x);
        }
      });
      this.guardarLista(listaRutas);
      this.totalIndice = listaRutas.length;
    });
  }
  // Gestiona el scroll
  guardarLista(lista: Lugar[]) {
    this.indice = this.listaRutas.length;
    for (let i = this.indice; i < this.indice + 6; i++) {
      if (lista[i] != null) {
        this.listaRutas.push(lista[i]);
      }
    }
    this.codeSelected();
  }
  loadDataArray(event) {
    if (this.totalIndice - 6 <= this.indice) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }
    setTimeout(() => {
      this.saveLista();
      event.target.complete();
    }, 1000);
  }
  // Ordenar eventos por fecha
  ordenarDescendientePorFecha(a, b) {
    if (a.fecha > b.fecha) {
      return -1;
    }
    if (a.fecha < b.fecha) {
      return 1;
    }
    return 0;
  }
  ordenarAscendientePorFecha(a, b) {
    if (a.fecha > b.fecha) {
      return 1;
    }
    if (a.fecha < b.fecha) {
      return -1;
    }
    return 0;
  }
  ordenarLugaresDescendiente() {
    this.listaRutas.sort(this.ordenarDescendientePorFecha);
  }

  ordenarLugaresAscendiente() {
    this.listaRutas.sort(this.ordenarAscendientePorFecha);
  }
  codeSelected() {
    switch (this.selectcategory) {
      case 'asc':
        this.ordenarLugaresAscendiente();
        break;
      case 'desc':
        this.ordenarLugaresDescendiente();
        break;
    }
  }

}
