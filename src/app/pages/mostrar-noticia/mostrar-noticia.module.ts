import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarNoticiaPageRoutingModule } from './mostrar-noticia-routing.module';

import { MostrarNoticiaPage } from './mostrar-noticia.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarNoticiaPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarNoticiaPage]
})
export class MostrarNoticiaPageModule {}
