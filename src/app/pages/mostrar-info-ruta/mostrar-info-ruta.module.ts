import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarInfoRutaPageRoutingModule } from './mostrar-info-ruta-routing.module';

import { MostrarInfoRutaPage } from './mostrar-info-ruta.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarInfoRutaPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarInfoRutaPage]
})
export class MostrarInfoRutaPageModule {}
