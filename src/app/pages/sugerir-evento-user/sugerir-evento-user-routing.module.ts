import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerirEventoUserPage } from './sugerir-evento-user.page';

const routes: Routes = [
  {
    path: '',
    component: SugerirEventoUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerirEventoUserPageRoutingModule {}
