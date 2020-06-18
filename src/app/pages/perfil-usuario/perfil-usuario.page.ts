import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertController, ToastController} from '@ionic/angular';
import {User} from '../../interfaces/interfaces';
import {error} from 'util';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  constructor(private authService: AuthService, private alertController: AlertController,
              private toastController: ToastController, private router: Router) { }
  user = {
    _id: '',
    username : '',
    nombre : '',
    apellido : '',
    email : '',
    password : '',
    imagen : '',
    tipo : ''
  };
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getUser();
  }
  handleImgError(ev: any) { // Resetea la imagen si introduce un url no correcto
    const user = {
      _id: this.user._id,
      username : this.user.username,
      nombre : this.user.nombre,
      apellido : this.user.apellido,
      email : this.user.email,
      password : this.user.password,
      imagen : '',
      tipo : this.user.tipo
    };
    this.authService.updateProfile(this.user._id, user).subscribe(r => {
      this.user = user;
    });
    this.user.imagen = '';
    this.toastUrlErroneo();
  }
  getUser() { // Saca el usuario
    this.authService.getProfile().subscribe(r => {
      this.user = r;
    });
  }
  // Serie de alerts para que el usuario actualice su imagen, perfil y contraseña
  async alertCambiarImagen() {
    const alert = await this.alertController.create({
      header: 'Insertar nueva imagen',
      backdropDismiss: false,
      inputs: [
        {
          name: 'urlImagen',
          type: 'text',
          placeholder: 'Introduce el URL de la imagen',
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            if (data.urlImagen !== '') {
              const user = {
                _id: this.user._id,
                username : this.user.username,
                nombre : this.user.nombre,
                apellido : this.user.apellido,
                email : this.user.email,
                password : this.user.password,
                imagen : data.urlImagen,
                tipo : this.user.tipo
              };
              this.updateUser(user);
            } else {
              this.toastRellenarCampos();
              }
            }
        }
      ]
    });
    await alert.present();
  }
  async alertUpdatePerfil() {

    const alert = await this.alertController.create({
      header: 'Actualizar tu perfil',
      backdropDismiss: false,
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: this.user.username,
          placeholder: 'Nombre de usuario'
        },
        {
          name: 'email',
          type: 'text',
          value: this.user.email,
          placeholder: 'Correo electrónico'
        },
        {
          name: 'nombre',
          type: 'text',
          value: this.user.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'apellido',
          type: 'text',
          value: this.user.apellido,
          placeholder: 'Apellidos'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            if (data.nombre !== '' && data.username !== '' && data.apellido !== '' && data.email !== '') {
              const user = {
                _id: this.user._id,
                username: data.username,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: this.user.password,
                imagen: this.user.imagen,
                tipo: this.user.tipo
              };
              this.updateUser(user);
            } else {
              this.toastRellenarCampos();
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async alertUpdatePass() {

    const alert = await this.alertController.create({
      header: 'Actualizar tu perfil',
      backdropDismiss: false,
      inputs: [
        {
          name: 'newPass',
          type: 'text',
          placeholder: 'Nueva contraseña'
        },
        {
          name: 'newPass2',
          type: 'text',
          placeholder: 'Repetir contraseña'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
            if (data.newPass === data.newPass2) {
              if (data.newPass !== '') {
            const user = {
              _id: this.user._id,
              username : this.user.username,
              nombre : this.user.nombre,
              apellido : this.user.apellido,
              email : this.user.email,
              password : data.newPass,
              imagen : this.user.imagen,
              tipo : this.user.tipo
            };
            this.updateUser(user);
              } else {
                this.toastRellenarCampos();
              }
            } else {
              this.toastNoMatchPass();
            }
          }
        }
      ]
    });
    await alert.present();
  }
  abrirRutasUser() {
    this.router.navigate(['/mostrar-ruta-user']);
  }
  abrirEventosLugaresUser() {
    this.router.navigate(['/mostrar-eventolugar-user']);
  }
  updateUser(user: User)  { // Actualiza el usuario
    this.authService.updateProfile(this.user._id, user).subscribe(r => {
      this.user = user;
      this.actCorrecto();
    }, error1 => {
      if (error1.status === 400) {
        this.correoExiste();
      }
    });
  }
  async toastNoMatchPass() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  async toastRellenarCampos() {
    const toast = await this.toastController.create({
      message: 'Rellena todos los campos',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  async toastActualizadoCorrectamente() {
    const toast = await this.toastController.create({
      message: 'Se ha actualizado correctamente',
      position: 'bottom',
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }
  async toastCorreoExiste() {
    const toast = await this.toastController.create({
      message: 'Este correo ya esxiste',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  async toastUrlErroneo() {
    const toast = await this.toastController.create({
      message: 'El URL introducido es erróneo',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  cambiarUser() {
    this.alertUpdatePerfil();
  }
  cambiarPass() {
    this.alertUpdatePass();
  }
  correoExiste() {
    this.toastCorreoExiste();
  }
  actCorrecto() {
    this.toastActualizadoCorrectamente();
  }
  cambiarImg() {
    this.alertCambiarImagen();
  }
}
