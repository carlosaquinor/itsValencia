import {Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {News} from '../../interfaces/interfaces';
import {DatePipe} from '@angular/common';
import {IonInfiniteScroll} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  listaNoticias: News[] = [];
  totalIndice = 0;
  indice = 0;
  imagenUser = '';
  constructor(private newsService: NewsService,
              private datePipe: DatePipe,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getImagen();
    this.listaNoticias = [];
    this.imagenUser = '';
    this.infiniteScroll.disabled = false;
    this.saveLista();
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return fechaString;
  }
  routerMostrarNoticia(idNew2: string) {
    this.router.navigate(['/mostrar-noticia', {idNew: idNew2}]);
  }
  getImagen() { // Saca la imagen del usuario (si esta logeado)
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(r => {
        this.imagenUser = r.imagen;
      });
    }
  }
  // Gestiona el scroll
  guardarLista(lista: News[]) {
    this.indice = this.listaNoticias.length;
    for (let i = this.indice; i < this.indice + 5; i++) {
      if (lista[i] != null) {
        this.listaNoticias.push(lista[i]);
      }
    }
  }
  saveLista() {
    this.newsService.GetAllNews().subscribe(r => {
      this.guardarLista(r);
      this.totalIndice = r.length;
    });
  }
  loadData(event) {
    if (this.totalIndice - 5 <= this.indice) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }
    setTimeout(() => {
      this.saveLista();
      event.target.complete();
    }, 1000);
  }

}
