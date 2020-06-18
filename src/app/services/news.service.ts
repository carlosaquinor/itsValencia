import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    // readonly URL = 'http://localhost:3000/api/news';
     readonly URL = 'https://itsvalencia.herokuapp.com/api/news';
    constructor(private http: HttpClient) {
    }
    GetAllNews() {
        return this.http.get<News[]>(this.URL + `/`); // Obtiene todas las noticias
    }
    GetOneNew(idNew: string) {
        return this.http.get<News>(this.URL + `/${idNew}`); // Obtiene una noticia para mostrar
    }
}
