import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarMapaPageRoutingModule } from './mostrar-mapa-routing.module';

import { MostrarMapaPage } from './mostrar-mapa.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarMapaPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarMapaPage]
})
export class MostrarMapaPageModule {}
