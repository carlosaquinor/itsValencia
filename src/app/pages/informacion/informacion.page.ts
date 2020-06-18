import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  registrarLugar() { // Comprueba si el user esta logeado antes de enviarle a regisrar un lugar
    if (this.authService.loggedIn()) {
      this.router.navigate(['/sugerir-lugar-user']);
    } else {
      this.router.navigate(['/login']);
      this.toastNotLogged();
    }
  }
  registrarEvento() { // Lo mismo para los eventos
    if (this.authService.loggedIn()) {
      this.router.navigate(['/sugerir-evento-user']);
    } else {
      this.router.navigate(['/login']);
      this.toastNotLogged();
    }
  }
  async toastNotLogged() { // Manda alerta si no has iniciado sesión
    const toast = await this.toastController.create({
      message: 'Has de iniciar sesión si quieres realizar una sugerencia',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
}
