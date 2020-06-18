export interface ComponentMenu {
    nombre: string;
    icono: string;
    redirectTo: string;
}

export interface User {
    _id: string;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    imagen: string;
    tipo: string;
}

export interface Lugar {
    _id: string;
    categoria: string;
    imagen: string[];
    nombre: string;
    descripcion: string;
    fecha: Date;
    idusuario: string;
    direccion: string;
    valoracion: number;
    publicado: boolean;
}

export interface Comentario {
    name: string;
    email: string;
    comentario: string;
    idNoticia: string;
    imgUser: string;
    idUser: string;
    valoracionUser: number;
    fecha: string;
}

export interface Ruta {
    _id: string;
    origen: string;
    paradas: any[];
    destino: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    contacto: string;
    imagen: string;
    publicado: boolean;
    idusuario: string;
}

export interface Apuntado {
    nombre: string;
    apellido: string;
    contacto: string;
    ruta: string;
    usuario: string;
}
export interface Evento {
    _id: string;
    imagen: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    inicio: Date;
    final: Date;
    coste: string;
    organizador: string;
    idusuario: string;
    publicado: boolean;
}
export interface News {
    _id: string;
    titulo: string;
    subtitulo: string;
    imagen: any[];
    autor: string;
    contenido: string;
    fecha: Date;
    idusuario: string;
}
