import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  formularioRegister: FormGroup;
  passNoCoincide = false;
  passNoCaracteresSuficientes = false;
  constructor(private toastController: ToastController,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.resetearFormulario();
  }
  doRegister() {
    if (this.formularioRegister.get('password').value === this.formularioRegister.get('validatePassword').value) {
      this.doRegistrarse();
    } else {
      this.toastNoPassMatch();
    }
  }
  async toastNoPassMatch() {
    const toast = await this.toastController.create({
      message: 'Las contraseñan no coinciden',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  resetearFormulario() {
    this.formularioRegister.reset( // Reinicia el formulario
        {
          nombre: '',
          apellido: '',
          username: '',
          email: '',
          password: '',
          validatePassword: '',
          tipo: 'app',
          imagen: ''
        });
  }
  async toastCorreoYaRegistrado() {
    const toast = await this.toastController.create({
      message: 'El correo introducido ya existe',
      position: 'bottom',
      duration: 1000,
      color: 'danger'
    });
    toast.present();
  }
  confirmarPassword() { // Comprueba a tiempo real que se cumplan ciertos requisitos a medida que se inserta una contraseña
    if (this.formularioRegister.get('password').value === this.formularioRegister.get('validatePassword').value) {
      this.passNoCoincide = true;
    } else {
      this.passNoCoincide = false;
    }
    if (this.formularioRegister.get('password').value.split('').length > 5) {
      this.passNoCaracteresSuficientes = true;
    } else {
      this.passNoCaracteresSuficientes = false;
    }
  }
  get puedeRegistrar() { // Decide si se puede registrar en base a la función anterior
    return this.passNoCaracteresSuficientes === true && this.passNoCoincide === true;
  }
  doRegistrarse() {
    if ( this.formularioRegister.invalid ) { // Comprueba que todos los campos sean correctos
      return Object.values( this.formularioRegister.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      this.authService.signUp(this.formularioRegister.value) // Realiza el registro
          .subscribe(
              res => {
                console.log(res);
                localStorage.setItem('token', res.token); // Guarda el token si el registro es correcto
                this.router.navigate(['perfil-usuario']);
                this.resetearFormulario();
              },
              err => {
                this.toastCorreoYaRegistrado();
                this.formularioRegister.get('email').setValue('');
              }
          );
    }
  }
  // Funciones para el correcto funcionamiento del formulario
  crearFormulario() {
    this.formularioRegister = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required
      ]),
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'),
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      validatePassword: new FormControl('', [
        Validators.required
      ]),
      tipo: new FormControl('app'),
      imagen: new FormControl('')
    });
  }
  get nombreNoValido() {
    return this.formularioRegister.get('nombre').invalid && this.formularioRegister.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.formularioRegister.get('apellido').invalid && this.formularioRegister.get('apellido').touched;
  }

  get correoNoValido() {
    return this.formularioRegister.get('email').invalid && this.formularioRegister.get('email').touched;
  }

  get usuarioNoValido() {
    return this.formularioRegister.get('username').invalid && this.formularioRegister.get('username').touched;
  }

  get passNoValido() {
    return this.formularioRegister.get('password').invalid && this.formularioRegister.get('password').touched;
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
}
