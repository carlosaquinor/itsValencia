import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    showPassword = false;
    passwordToggleIcon = 'eye';
    user = {
        email: '',
        password: '',
        tipo: 'app'
    };

    constructor(private toastController: ToastController,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }
    ionViewWillEnter() {
        this.user = { // Usuario que se utilizara para realizar el login
            email: '',
            password: '',
            tipo: 'app'
        };
    }

    navigate() {
        this.router.navigate(['/registro']);
    }

    doLogin() {

        this.authService.signIn(this.user) // Comprueba el login
            .subscribe(
                res => {
                    localStorage.setItem('token', res.token); // Si es correcto, guarda el token, asi no se tiene que logear
                    this.router.navigate(['perfil-usuario']);
                    this.user = {
                        email: '',
                        password: '',
                        tipo: 'app'
                    };
                },
                err => this.toastErrorLogin()
            );
    }

    async toastErrorLogin() {
        const toast = await this.toastController.create({
            message: 'Email o contraseña incorrectos',
            position: 'bottom',
            duration: 1000,
            color: 'danger'
        });
        toast.present();
    }
    togglePassword() { // Ojo ocultar contrasña
        this.showPassword = !this.showPassword;
        if (this.passwordToggleIcon === 'eye') {
            this.passwordToggleIcon = 'eye-off';
        } else {
            this.passwordToggleIcon = 'eye';
        }
    }

}
