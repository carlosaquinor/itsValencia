import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarNoticiaPage } from './mostrar-noticia.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarNoticiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarNoticiaPageRoutingModule {}
