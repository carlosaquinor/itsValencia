import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'noticias', pathMatch: 'full' },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'sitios-turisticos',
    loadChildren: () => import('./pages/sitios-turisticos/sitios-turisticos.module').then( m => m.SitiosTuristicosPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./pages/rutas/rutas.module').then( m => m.RutasPageModule)
  },
  {
    path: 'playas',
    loadChildren: () => import('./pages/playas/playas.module').then( m => m.PlayasPageModule)
  },
  {
    path: 'hoteles',
    loadChildren: () => import('./pages/hoteles/hoteles.module').then( m => m.HotelesPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'mostrar-lugar',
    loadChildren: () => import('./pages/mostrar-lugar/mostrar-lugar.module').then( m => m.MostrarLugarPageModule)
  },
  {
    path: 'mostrar-mapa',
    loadChildren: () => import('./pages/mostrar-mapa/mostrar-mapa.module').then( m => m.MostrarMapaPageModule)
  },
  {
    path: 'crear-ruta',
    loadChildren: () => import('./pages/crear-ruta/crear-ruta.module').then( m => m.CrearRutaPageModule)
  },
  {
    path: 'mostrar-ruta',
    loadChildren: () => import('./pages/mostrar-ruta/mostrar-ruta.module').then( m => m.MostrarRutaPageModule)
  },
  {
    path: 'mostrar-info-ruta',
    loadChildren: () => import('./pages/mostrar-info-ruta/mostrar-info-ruta.module').then( m => m.MostrarInfoRutaPageModule)
  },
  {
    path: 'mostrar-ruta-user',
    loadChildren: () => import('./pages/mostrar-ruta-user/mostrar-ruta-user.module').then( m => m.MostrarRutaUserPageModule)
  },
  {
    path: 'sugerir-lugar-user',
    loadChildren: () => import('./pages/sugerir-lugar-user/sugerir-lugar-user.module').then( m => m.SugerirLugarUserPageModule)
  },
  {
    path: 'sugerir-evento-user',
    loadChildren: () => import('./pages/sugerir-evento-user/sugerir-evento-user.module').then( m => m.SugerirEventoUserPageModule)
  },
  {
    path: 'mostrar-eventolugar-user',
    loadChildren: () => import('./pages/mostrar-eventolugar-user/mostrar-eventolugar-user.module')
        .then( m => m.MostrarEventolugarUserPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'mostrar-noticia',
    loadChildren: () => import('./pages/mostrar-noticia/mostrar-noticia.module').then( m => m.MostrarNoticiaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
