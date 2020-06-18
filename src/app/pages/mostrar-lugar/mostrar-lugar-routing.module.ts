import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarLugarPage } from './mostrar-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarLugarPageRoutingModule {}
