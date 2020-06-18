import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {News} from '../../interfaces/interfaces';
import {NewsService} from '../../services/news.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mostrar-noticia',
  templateUrl: './mostrar-noticia.page.html',
  styleUrls: ['./mostrar-noticia.page.scss'],
})
export class MostrarNoticiaPage implements OnInit {
  noticia: any = {};
  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  loadData() {
    const idNew = this.activatedRoute.snapshot.paramMap.get('idNew');
    this.newsService.GetOneNew(idNew).subscribe(r => {
      this.noticia = r;
    });
  }
  pipeDate(date: Date) {  // Formateo de la fecha
    const fechaString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return fechaString;
  }
}
