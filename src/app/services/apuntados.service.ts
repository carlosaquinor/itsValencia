import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Apuntado} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ApuntadoService {
    // readonly URL = 'http://localhost:3000/api/apuntados';
     readonly URL = 'https://itsvalencia.herokuapp.com/api/apuntados';
    constructor(private http: HttpClient) {}
    crearApuntado(newAputnado: Apuntado) {
        return this.http.post<any>(`${this.URL}/crear`, newAputnado);
    }
    getApuntadosRuta(idRuta: string) {
        return this.http.get<[any]>(`${this.URL}/ruta/${idRuta}`);
    }
    getApuntadosUser(idUser: string) {
        return this.http.get<[any]>(`${this.URL}/user/${idUser}`);
    }
    borrarApuntado(idApuntado: string) {
        return this.http.delete<any>(`${this.URL}/delete/${idApuntado}`);
    }

}
