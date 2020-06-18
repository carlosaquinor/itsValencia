import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarEventolugarUserPage } from './mostrar-eventolugar-user.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarEventolugarUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarEventolugarUserPageRoutingModule {}
