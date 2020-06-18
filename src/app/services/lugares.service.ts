import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lugar} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LugaresService {
    // readonly URL = 'http://localhost:3000/api/lugares';
    readonly URL = 'https://itsvalencia.herokuapp.com/api/lugares';
    constructor(private http: HttpClient) {
    }
    GetLugaresPorCategoria(categoria: string) {
        return this.http.get<Lugar[]>(this.URL + `/categoria/${categoria}`); // Obtiene los lugares por categorías
    }
    GetLugaresPorId(idLugar: string) {
        return this.http.get<Lugar>(this.URL + `/${idLugar}`); // Obtiene el lugar pasando el id
    }
    getLugaresPorIdUsuario(idUsuario: string) {
        return this.http.get<any>(this.URL + `/lugar/user/${idUsuario}`); // Obtiene el lugar pasando el id del user
    }
    crearLugarUser(newLugar: any) {
        return this.http.post<any>(`${this.URL}/crear`, newLugar);
    }
    updateValoracion(newidLugar: string, newValoracion: number) {
        return this.http.put<any>(`${this.URL}/update/valoracion/${newidLugar}`, {valoracion: newValoracion});
    }
}
