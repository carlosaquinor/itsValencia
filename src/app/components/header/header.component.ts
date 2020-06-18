import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private alertController: AlertController,
              private authService: AuthService, private router: Router) { }
  @Input() titulo: string;
  ngOnInit() {
  }
  async cerrarSesion() { // Alert para crear el comentario (se abre al pulsar el boton de añadir)
    const alert = await this.alertController.create({
      header: 'Seguro que quieres cerrar sesión?',
      backdropDismiss: false,
      inputs: [
        ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
           this.logout();
          }
        }
      ]
    });
    await alert.present();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
