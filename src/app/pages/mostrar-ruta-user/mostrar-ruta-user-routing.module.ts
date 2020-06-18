import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarRutaUserPage } from './mostrar-ruta-user.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarRutaUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarRutaUserPageRoutingModule {}
