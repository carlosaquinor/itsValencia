import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Evento} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class EventosService {
    // readonly URL = 'http://localhost:3000/api/eventos';
     readonly URL = 'https://itsvalencia.herokuapp.com/api/eventos';
    constructor(private http: HttpClient) {
    }
    getEventos() {
        return this.http.get<Evento[]>(this.URL + `/`);
    }
    crearEventoUser(newEvento: Evento) {
        return this.http.post<any>(this.URL + `/crear`, newEvento);
    }
    getEventosPorIdUsuario(idUsuario: string) {
        return this.http.get<any>(this.URL + `/evento/user/${idUsuario}`); // Obtiene el evento pasando el id del user
    }
    deleteFecha() {
        const fecha = new Date();
        return this.http.delete<any>(`${this.URL}/fecha/${fecha}`);
    }
}
