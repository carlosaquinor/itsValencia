import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventosService} from '../../services/eventos.service';


@Component({
  selector: 'app-sugerir-evento-user',
  templateUrl: './sugerir-evento-user.page.html',
  styleUrls: ['./sugerir-evento-user.page.scss'],
})
export class SugerirEventoUserPage implements OnInit {
  formularioEventos: FormGroup;
  fechaActualRAW = '';
  constructor(private toastController: ToastController,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private eventosService: EventosService,
              private alertController: AlertController) { this.crearFormulario(); }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.fechaAcutal();
  }
  fechaAcutal() { // Fecha minima del evento (fecha actual)
    this.fechaActualRAW = new Date().toISOString();
  }
  inicioIntroducido() { // Comprueba que se haya introducido la fecha de inicio para que se pueda introducir el final
    return this.formularioEventos.get('inicio').value === '';
  }
  menorQueInicio() { // Comprueba que la fecha final no sea menor a la de inicio
    if (this.formularioEventos.get('inicio').value > this.formularioEventos.get('final').value)  {
      this.formularioEventos.get('final').setValue('');
    }
  }
  resetearFormulario() { // Resetea los valores del formulario
    this.formularioEventos.reset({
      imagen: '',
      nombre: '',
      descripcion: '',
      direccion: '',
      inicio: '',
      final: '',
      coste: '',
      organizador: '',
      idusuario: '',
      publicado: false
    });
    this.router.navigate(['/informacion']);
  }
  // Gestión del formulario
  crearFormulario() {
    this.formularioEventos = this.formBuilder.group({
      imagen: new FormControl('', [
        Validators.required
      ]),
      nombre: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      inicio: new FormControl('', [
        Validators.required
      ]),
      final: new FormControl('', [
        Validators.required
      ]),
      coste: new FormControl(''),
      organizador: new FormControl('', [
        Validators.required
      ]),
      idusuario: new FormControl(''),
      publicado: new FormControl(false)
    });
  }
  get nombreNoValido() {
    return this.formularioEventos.get('nombre').invalid && this.formularioEventos.get('nombre').touched;
  }

  get imagenNoValido() {
    return this.formularioEventos.get('imagen').invalid && this.formularioEventos.get('imagen').touched;
  }

  get direccionNoValido() {
    return this.formularioEventos.get('direccion').invalid && this.formularioEventos.get('direccion').touched;
  }

  get descripcionNoValido() {
    return this.formularioEventos.get('descripcion').invalid && this.formularioEventos.get('descripcion').touched;
  }

  get inicioNoValido() {
    return this.formularioEventos.get('inicio').invalid && this.formularioEventos.get('inicio').touched;
  }

  get finalNoValido() {
    return this.formularioEventos.get('final').invalid && this.formularioEventos.get('final').touched;
  }

  get organizadorNoValido() {
    return this.formularioEventos.get('organizador').invalid && this.formularioEventos.get('organizador').touched;
  }

  registrarEvento() {
    if ( this.formularioEventos.invalid ) {
      return Object.values( this.formularioEventos.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.authService.getProfile().subscribe(y => {
        if (this.formularioEventos.get('coste').value === '') {
          this.formularioEventos.value.coste = 'Gratuito';
        }
        this.formularioEventos.value.idusuario = y._id;
        this.eventosService.crearEventoUser(this.formularioEventos.value).subscribe(r => {
          this.alertRecuerdoConfirmacion();
          this.resetearFormulario();
        });
      });
    }
  }
  async alertRecuerdoConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Estamos verificando tu evento',
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
