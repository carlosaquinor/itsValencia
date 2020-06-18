import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ComponentMenu} from '../../interfaces/interfaces';
import {DataService} from '../../services/data.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  componentesMenu: Observable<ComponentMenu[]>;
  constructor(private dataService: DataService, private menu: MenuController, private router: Router, public authService: AuthService) { }
  imagenUser = '';
  ngOnInit() {
    this.componentesMenu = this.dataService.getOptions();
    this.getImagen();
  }
  closeMenu() {
    this.menu.close();
  }
  // Chequeo si el usuario tiene imagen para ponerla en el boton
  getImagen() {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(r => {
        this.imagenUser = r.imagen;
      });
    }
  }
  routerNoticias() {
    this.router.navigate(['/noticias']);
  }
  // Si esta logeado lo envia al perfil
  routerPerfil() {
      this.getImagen();
      this.router.navigate(['/perfil-usuario']);
  }
}
