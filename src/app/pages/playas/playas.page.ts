import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController} from '@ionic/angular';
import {LugaresService} from '../../services/lugares.service';
import {Router} from '@angular/router';
import {Lugar} from '../../interfaces/interfaces';

@Component({
  selector: 'app-playas',
  templateUrl: './playas.page.html',
  styleUrls: ['./playas.page.scss'],
})
export class PlayasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  selectcategory = 'desc';
  categoria = 'Playas';
  totalIndice = 0;
  indice = 0;
  constructor(private lugaresService: LugaresService,
              private router: Router,
              private loadingController: LoadingController) {
  }

  listaLugares: any = [];

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
    this.listaLugares = [];
    this.saveLista();
    loading.dismiss();
  }
  mostrarLugar(id: string) {
    this.router.navigate(['/mostrar-lugar', {idLugar: id}]);
  }
  // Scroll management
  saveLista() {
    this.lugaresService.GetLugaresPorCategoria(this.categoria).subscribe(r => {
      this.guardarLista(r);
      this.totalIndice = r.length;
    });
  }
  guardarLista(lista: Lugar[]) {
    this.indice = this.listaLugares.length;
    for (let i = this.indice; i < this.indice + 10; i++) {
      if (lista[i] != null) {
        this.listaLugares.push(lista[i]);
      }
    }
    this.codeSelected();
  }
  loadDataArray(event) {
    if (this.totalIndice - 10 <= this.indice) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }
    setTimeout(() => {
      this.saveLista();
      event.target.complete();
    }, 1000);
  }
  // Ordenar la lista
  ordenarDescendiente(a, b) {
    if (a.valoracion > b.valoracion) {
      return -1;
    }
    if (a.valoracion < b.valoracion) {
      return 1;
    }
    return 0;
  }

  ordenarAscendiente(a, b) {
    if (a.valoracion > b.valoracion) {
      return 1;
    }
    if (a.valoracion < b.valoracion) {
      return -1;
    }
    return 0;
  }

  ordenarLugaresDescendiente() {
    this.listaLugares.sort(this.ordenarDescendiente);
  }

  ordenarLugaresAscendiente() {
    this.listaLugares.sort(this.ordenarAscendiente);
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
