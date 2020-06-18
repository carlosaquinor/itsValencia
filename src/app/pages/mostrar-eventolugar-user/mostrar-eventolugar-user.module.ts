import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarEventolugarUserPageRoutingModule } from './mostrar-eventolugar-user-routing.module';

import { MostrarEventolugarUserPage } from './mostrar-eventolugar-user.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MostrarEventolugarUserPageRoutingModule,
        ComponentsModule
    ],
  declarations: [MostrarEventolugarUserPage]
})
export class MostrarEventolugarUserPageModule {}
