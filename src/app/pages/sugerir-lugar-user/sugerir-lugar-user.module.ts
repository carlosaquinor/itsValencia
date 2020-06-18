import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerirLugarUserPageRoutingModule } from './sugerir-lugar-user-routing.module';

import { SugerirLugarUserPage } from './sugerir-lugar-user.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SugerirLugarUserPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [SugerirLugarUserPage]
})
export class SugerirLugarUserPageModule {}
