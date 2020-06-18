import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComponentMenu} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) {
    }
    getOptions() {
        return this.http.get<ComponentMenu[]>('assets/data/menu.json'); // Get de los elementos del menu
    }

}
