import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerirEventoUserPageRoutingModule } from './sugerir-evento-user-routing.module';

import { SugerirEventoUserPage } from './sugerir-evento-user.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SugerirEventoUserPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [SugerirEventoUserPage]
})
export class SugerirEventoUserPageModule {}
