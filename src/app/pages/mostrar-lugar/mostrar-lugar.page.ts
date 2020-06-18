import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {LugaresService} from '../../services/lugares.service';
import {ComentariosService} from '../../services/comentarios.service';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Comentario, Lugar} from '../../interfaces/interfaces';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-mostrar-lugar',
    templateUrl: './mostrar-lugar.page.html',
    styleUrls: ['./mostrar-lugar.page.scss'],
})
export class MostrarLugarPage implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    constructor(private route: ActivatedRoute, private lugaresService: LugaresService,
                private comentariosService: ComentariosService, private authService: AuthService,
                private router: Router, private toastController: ToastController, private datepipe: DatePipe,
                private loadingController: LoadingController, private alertController: AlertController) {
    }
    // Todo: Desactivar el menu de comentarios al comentar
    nosePuedeComentar = false;
    idLugar = '';
    comentarioUser = {
        name: '',
        email: '',
        comentario: '',
        idNoticia: '',
        imgUser: '',
        idUser: '',
        valoracionUser: 0,
        fecha: Date()
    };
    lugar = {
        _id: '',
        categoria: '',
        imagen: [],
        nombre: '',
        descripcion: '',
        direccion: '',
        valoracion: 0,
        publicado: false,
    };
    user = {
        _id: '',
        username: '',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        imagen: '',
        tipo: ''
    };
    valoracionUser = 1;
    // Estas variables son usadas para manegar el infinit scroll
    totalIndice = 0;
    indice = 0;
    ComentariosArrayScroll: Comentario[] = [];

    ngOnInit() {
    }
    ionViewWillEnter() {
        this.loadLugar();
    }
    async loadLugar() { // Consigue un lugar en base a su id y reecalcula su valoración en base a los comentarios
        const loading = await this.loadingController.create({
            spinner: 'dots',
        });
        loading.present();
        this.idLugar = this.route.snapshot.paramMap.get('idLugar');
        this.lugaresService.GetLugaresPorId(this.idLugar).subscribe(r => {
            this.lugar = r;
            this.comentariosService.GetValoracionLugar(this.idLugar).subscribe(y => { // Calcula la valoracion en base a los comentarios
                this.lugar.valoracion = y.Resultado;
                this.lugaresService.updateValoracion(this.lugar._id, this.lugar.valoracion).subscribe(); // Actualiza la valoracion
                this.getComentarioUser();
            });
        });
        this.saveLista();
        loading.dismiss();
    }
    getComentarioUser() { // Compureba si el user ya ha comentado
        if (this.authService.loggedIn()) { // Verifica si el usuario esta logeado
            this.authService.getProfile().subscribe(r => {
                this.user = r;
                this.comentariosService.GetComentariosLugar(this.idLugar).subscribe(async y => {
                    y.forEach(x => { // Busca si el usuario ya ha comentado
                        if (x.idUser === this.user._id) {
                            this.comentarioUser = x; // Si fuese así, se mostrara en vez de la ventana de comentar
                        }
                    });
                });
            });
        }
    }
    mostrarMapa() {
        this.router.navigate(['/mostrar-mapa', {dir: this.lugar.direccion, nombre: this.lugar.nombre}]);
    }

   crearComentario() { // Crea el comentario y actualiza la valoracion
        if (this.authService.loggedIn()) {
            this.authService.getProfile().subscribe(r => {
                this.user = r;
                this.comentariosService.GetComentariosLugar(this.idLugar).subscribe(async y => {
                    let existeComentario = false;
                    y.forEach(x => {
                        if (x.idUser === this.user._id) {
                            existeComentario = true;
                        }
                    });
                    if (existeComentario) {
                        this.toastExisteComentario();
                        this.comentarioUser.comentario = '';
                        this.valoracionUser = 1;
                        this.nosePuedeComentar = true;
                    } else {
                        if (this.comentarioUser.comentario !== '') {
                            const loading = await this.loadingController.create({
                                spinner: 'dots',
                            });
                            loading.present();
                            this.comentarioUser.email = this.user.email;
                            this.comentarioUser.fecha = Date();
                            this.comentarioUser.idNoticia = this.idLugar;
                            this.comentarioUser.idUser = this.user._id;
                            this.comentarioUser.imgUser = this.user.imagen;
                            this.comentarioUser.name = this.user.username;
                            this.comentarioUser.valoracionUser = this.valoracionUser;
                            this.comentariosService.PostComentario(this.comentarioUser).subscribe();
                            this.toastComentarioPosteado();
                            this.lugaresService.GetLugaresPorId(this.idLugar).subscribe(l => {
                                this.lugar = l;
                                this.comentariosService.GetValoracionLugar(this.idLugar).
                                subscribe(z => { // Calcula la valoracion en base a los comentarios
                                    this.lugar.valoracion = z.Resultado;
                                    this.lugaresService.updateValoracion
                                    (this.lugar._id, this.lugar.valoracion).subscribe(); // Actualiza la valoracion
                                    this.getComentarioUser();
                                    this.lugar = l;
                                    this.nosePuedeComentar = true;
                                    this.ComentariosArrayScroll = [];
                                    this.saveLista();
                                });
                            });
                            loading.dismiss();
                        } else {
                            this.toastRellenaComentario();
                        }
                    }
                });
            });
        } else {
            this.notLogged();
        }
    }
    notLogged() {
        this.toastNotLogged();
        this.router.navigate(['/login']);
    }

    async toastNotLogged() {
        const toast = await this.toastController.create({
            message: 'Has de iniciar sesión antes de escribir un comentario',
            position: 'bottom',
            duration: 1000,
            color: 'danger'
        });
        toast.present();
    }

    async toastExisteComentario() {
        const toast = await this.toastController.create({
            message: 'Solo puedes crear un comentario',
            position: 'bottom',
            duration: 1000,
            color: 'warning'
        });
        toast.present();
    }

    async toastComentarioPosteado() {
        const toast = await this.toastController.create({
            message: 'Comentario creado con exito',
            position: 'bottom',
            duration: 1000,
            color: 'success'
        });
        toast.present();
    }

    async toastRellenaComentario() {
        const toast = await this.toastController.create({
            message: 'Has de escribir un comentario',
            position: 'bottom',
            duration: 1000,
            color: 'danger'
        });
        toast.present();
    }

    pipeDate(date: string) {  // Formateo de la fecha
        const dateString = new Date(date);
        const fechaString = this.datepipe.transform(dateString, 'yyyy-MM-dd');
        return fechaString;
    }

    async mostrarComentario(comentario: Comentario) {
        const alert = await this.alertController.create({
            header: comentario.name,
            subHeader: 'Valoración : ' + comentario.valoracionUser,
            message: comentario.comentario,
            buttons: ['Aceptar']
        });
        await alert.present();
    }
    // Estas funciones son usadas para el manejamiento del scroll de comentarios
    guardarLista(lista: Comentario[]) {
        this.indice = this.ComentariosArrayScroll.length;
        for (let i = this.indice; i < this.indice + 3; i++) {
            if (lista[i] != null) {
                this.ComentariosArrayScroll.push(lista[i]);
            }
        }
    }

    saveLista() {
        this.comentariosService.GetComentariosLugar(this.idLugar).subscribe(r => {
            this.guardarLista(r);
            this.totalIndice = r.length;
        });
    }
    loadData(event) {
        if (this.totalIndice - 3 <= this.indice) {
            event.target.complete();
            this.infiniteScroll.disabled = true;
            return;
        }
        setTimeout(() => {
            this.saveLista();
            event.target.complete();
        }, 1000);
    }
}
