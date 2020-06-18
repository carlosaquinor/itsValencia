import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarRutaPage } from './mostrar-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarRutaPageRoutingModule {}
