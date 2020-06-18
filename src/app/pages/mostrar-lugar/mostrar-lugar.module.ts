import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarLugarPageRoutingModule } from './mostrar-lugar-routing.module';

import { MostrarLugarPage } from './mostrar-lugar.page';
import {ComponentsModule} from '../../components/components.module';
import {IonicRatingModule} from 'ionic4-rating/dist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarLugarPageRoutingModule,
        ComponentsModule,
        IonicRatingModule
    ],
  declarations: [MostrarLugarPage]
})
export class MostrarLugarPageModule {}
