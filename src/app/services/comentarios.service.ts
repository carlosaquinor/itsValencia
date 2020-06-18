import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comentario} from '../interfaces/interfaces';
@Injectable({
    providedIn: 'root'
})

export class ComentariosService {
    // readonly URL = 'http://localhost:3000/api/comentarios';
     readonly URL = 'https://itsvalencia.herokuapp.com/api/comentarios';
    constructor(private http: HttpClient) {}
    GetComentariosLugar(idLugar: string) {
        return this.http.get<Comentario[]>(this.URL + `/${idLugar}`);
    }
    GetValoracionLugar(idLugar: string) {
        return this.http.get<any>(this.URL + `/valoracion/${idLugar}`);
    }
    PostComentario(comentario: Comentario) {
        return this.http.post<any>(this.URL + '/' , comentario);
    }
}
