import {Component, OnInit, ViewChild} from '@angular/core';
import {EventosService} from '../../services/eventos.service';
import {Evento} from '../../interfaces/interfaces';
import {DatePipe} from '@angular/common';
import {AlertController, IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss']
})
export class EventosPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  listaEventos: Evento[] = [];
  constructor(private eventosService: EventosService, private datePipe: DatePipe,
              private router: Router, private alertController: AlertController) { }
  totalIndice = 0;
  indice = 0;
  selectcategory = 'asc';
  fechaActual = new Date();
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
    this.ordenarLugaresAscendiente();
  }
  loadData() { // Funcion para cargar los datos
    this.eventosService.deleteFecha().subscribe(); // Funcion que elimina los eventos cuando conlcuyen
    this.fechaActual = new Date();
    this.listaEventos = [];
    this.infiniteScroll.disabled = false;
    this.saveLista();
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd h:mm');
    return fechaString;
  }
  mostrarMapa(direccion: string, nombe2: string) { // Abre el mapa del lugar
    this.router.navigate(['/mostrar-mapa', {dir: direccion, nombre: nombe2}]);
  }
  // Conjunto de funciones para gestionar el infinite scroll
  saveLista() {
    this.eventosService.getEventos().subscribe(r => {
     this.guardarLista(r);
     this.totalIndice = r.length;
    });
  }
  guardarLista(lista: Evento[]) {
    this.indice = this.listaEventos.length;
    for (let i = this.indice; i < this.indice + 3; i++) {
      if (lista[i] != null) {
        this.listaEventos.push(lista[i]);
      }
    }
    this.codeSelected();
  }
  loadDataArray(event) {
    if (this.totalIndice - 3 <= this.indice) {
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
    if (a.inicio > b.inicio) {
      return -1;
    }
    if (a.inicio < b.inicio) {
      return 1;
    }
    return 0;
  }
  ordenarAscendientePorFecha(a, b) {
    if (a.inicio > b.inicio) {
      return 1;
    }
    if (a.inicio < b.inicio) {
      return -1;
    }
    return 0;
  }
  ordenarLugaresDescendiente() {
    this.listaEventos.sort(this.ordenarDescendientePorFecha);
  }

  ordenarLugaresAscendiente() {
    this.listaEventos.sort(this.ordenarAscendientePorFecha);
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
