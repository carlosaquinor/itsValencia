import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Ruta} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class RutasService {
    // readonly URL = 'http://localhost:3000/api/rutas';
     readonly URL = 'https://itsvalencia.herokuapp.com/api/rutas';
    constructor(private http: HttpClient) {}
    crearRuta(newRuta: any) {
        return this.http.post<any>(`${this.URL}/crear`, newRuta);
    }
    deleteRuta(newIdRuta: string) {
        return this.http.delete<any>(`${this.URL}/delete/${newIdRuta}`);
    }
    getRutas() {
        return this.http.get<any[]>(`${this.URL}/`);
    }
    getRuta(idRuta: string) {
        return this.http.get<Ruta>(`${this.URL}/${idRuta}`);
    }
    deleteFecha() {
        const fecha = new Date();
        return this.http.delete<any>(`${this.URL}/fecha/${fecha}`);
    }

}
