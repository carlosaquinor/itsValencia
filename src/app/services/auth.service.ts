import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // readonly URL = 'http://localhost:3000/api';
     readonly URL = 'https://itsvalencia.herokuapp.com/api';

    constructor( private http: HttpClient, private router: Router) { }
    // Se registra el usuario //
    signUp(user) {
        return this.http.post<any>(this.URL + '/registrar', user);
    }
    // Login de usuario
    signIn(user) {
        return this.http.post<any>(this.URL + '/login', user);
    }
    // Guardar el toquen //
    loggedIn() {
        return !!localStorage.getItem('token');
    }
    // Eliminar el toquen //
    logout() {
        localStorage.removeItem('token');
        localStorage.clear();
    }
    // Seleccionar imagen
    getUser(idUser) {
        return this.http.get<User>(this.URL + `/user/${idUser}`);
    }
    // Traer el toquen //
    getToken() {
        return localStorage.getItem('token');
    }
    // Obtiene Datos del usuario
    getProfile() {
        const reqHeader = new HttpHeaders({
            Authorization: 'Bearer ' + this.getToken()
        });
        return this.http.get<User>(this.URL + '/profile', {headers: reqHeader});
    }
    updateProfile(id: string, newuser: User) {
        const reqHeader = new HttpHeaders({
            Authorization: 'Bearer ' + this.getToken()
        });
        return this.http.put<any>(`${this.URL}/update/${id}`, {user: newuser}, {headers: reqHeader});
    }
}
