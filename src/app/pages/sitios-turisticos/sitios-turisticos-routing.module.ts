import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitiosTuristicosPage } from './sitios-turisticos.page';

const routes: Routes = [
  {
    path: '',
    component: SitiosTuristicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitiosTuristicosPageRoutingModule {}
