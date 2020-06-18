import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelesPageRoutingModule } from './hoteles-routing.module';

import { HotelesPage } from './hoteles.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HotelesPageRoutingModule,
        ComponentsModule
    ],
  declarations: [HotelesPage]
})
export class HotelesPageModule {}
