import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarInfoRutaPage } from './mostrar-info-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarInfoRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarInfoRutaPageRoutingModule {}
