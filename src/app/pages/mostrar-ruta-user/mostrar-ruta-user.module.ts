import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarRutaUserPageRoutingModule } from './mostrar-ruta-user-routing.module';

import { MostrarRutaUserPage } from './mostrar-ruta-user.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarRutaUserPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarRutaUserPage]
})
export class MostrarRutaUserPageModule {}
