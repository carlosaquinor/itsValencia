import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerirLugarUserPage } from './sugerir-lugar-user.page';

const routes: Routes = [
  {
    path: '',
    component: SugerirLugarUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerirLugarUserPageRoutingModule {}
