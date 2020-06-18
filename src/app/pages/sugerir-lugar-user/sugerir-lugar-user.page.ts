import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LugaresService} from '../../services/lugares.service';

@Component({
  selector: 'app-sugerir-lugar-user',
  templateUrl: './sugerir-lugar-user.page.html',
  styleUrls: ['./sugerir-lugar-user.page.scss'],
})
export class SugerirLugarUserPage implements OnInit {
  formularioLugares: FormGroup;
  constructor(private toastController: ToastController,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private lugaresService: LugaresService,
              private alertController: AlertController) {
    this.crearFormulario();
  }
  ngOnInit() {
  }
  // Funciones para el correcto funcionamiento del formulario
  registrarLugar() { // Valida los valores del formulario
    if ( this.formularioLugares.invalid ) {
      return Object.values( this.formularioLugares.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.authService.getProfile().subscribe(y => {
        this.formularioLugares.value.fecha = new Date();
        this.formularioLugares.value.idusuario = y._id;
        this.lugaresService.crearLugarUser(this.formularioLugares.value).subscribe(r => {
        this.alertRecuerdoConfirmacion();
        this.resetearFormulario();
      });
      });
    }
  }
  resetearFormulario() {
    this.formularioLugares.reset({
      categoria: '',
      imagen: '',
      nombre: '',
      descripcion: '',
      direccion: '',
      fecha: '',
      idusuario: '',
      valoracion: 0,
      publicado: false
    });
    this.router.navigate(['/informacion']);
  }
  // Gestiona el formulario
  crearFormulario() {
    this.formularioLugares = this.formBuilder.group({
      categoria: new FormControl('', [
        Validators.required
      ]),
      imagen: new FormControl('', [
        Validators.required
      ]),
      nombre: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required
      ]),
      fecha: new FormControl(''),
      idusuario: new FormControl(''),
      publicado: new FormControl(false),
      valoracion: new FormControl(0)
    });
  }
  get categoriaNoValido() {
    return this.formularioLugares.get('categoria').invalid && this.formularioLugares.get('categoria').touched;
  }

  get imagenNoValido() {
    return this.formularioLugares.get('imagen').invalid && this.formularioLugares.get('imagen').touched;
  }

  get nombreNoValido() {
    return this.formularioLugares.get('nombre').invalid && this.formularioLugares.get('nombre').touched;
  }

  get descripcionNoValido() {
    return this.formularioLugares.get('descripcion').invalid && this.formularioLugares.get('descripcion').touched;
  }

  get direccionNoValido() {
    return this.formularioLugares.get('direccion').invalid && this.formularioLugares.get('direccion').touched;
  }
  async alertRecuerdoConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Estamos verificando tu lugar',
      backdropDismiss: false,
      message: 'Por favor, espera a que verifiquemos que todos los datos introducidos sean correctos. ' +
          'Agradecemos su paciencia',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => {
          }
        }
      ]
    });
    await alert.present();
  }

}
