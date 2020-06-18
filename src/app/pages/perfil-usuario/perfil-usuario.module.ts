import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';

import { PerfilUsuarioPage } from './perfil-usuario.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PerfilUsuarioPageRoutingModule,
        ComponentsModule
    ],
  declarations: [PerfilUsuarioPage]
})
export class PerfilUsuarioPageModule {}
