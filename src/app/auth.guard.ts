import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
// Verifica que este logeado sino le envia a la pagina inicio, eso sirva para que no pueda acceder por el navegador //
    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/evento-del-dia']);
        return false;
    }
}
