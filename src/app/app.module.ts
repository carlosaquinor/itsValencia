import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { IonicRatingModule } from 'ionic4-rating';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {DatePipe} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {AuthGuard} from './auth.guard';

registerLocaleData(localeEs, 'es');



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    IonicRatingModule],
  providers: [
    StatusBar,
    SplashScreen, Geolocation, DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  },
    AuthGuard,
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
