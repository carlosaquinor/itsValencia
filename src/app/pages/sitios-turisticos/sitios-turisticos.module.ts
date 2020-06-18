import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitiosTuristicosPageRoutingModule } from './sitios-turisticos-routing.module';

import { SitiosTuristicosPage } from './sitios-turisticos.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SitiosTuristicosPageRoutingModule,
        ComponentsModule
    ],
  declarations: [SitiosTuristicosPage]
})
export class SitiosTuristicosPageModule {}
