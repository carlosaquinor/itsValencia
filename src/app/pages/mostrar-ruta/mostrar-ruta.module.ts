import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarRutaPageRoutingModule } from './mostrar-ruta-routing.module';

import { MostrarRutaPage } from './mostrar-ruta.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarRutaPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarRutaPage]
})
export class MostrarRutaPageModule {}
