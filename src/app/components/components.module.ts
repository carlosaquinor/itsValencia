import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenuComponent} from './menu/menu.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {IonicRatingModule} from 'ionic4-rating/dist';
import {FormsModule} from '@angular/forms';




@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        IonicRatingModule,
        FormsModule
    ]
})
export class ComponentsModule { }
