import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { HttpClientModule , HttpClient } from '@angular/common/http' ; 
import { TranslateModule  , TranslateLoader, TranslateService } from '@ngx-translate/core' ;
import {TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { IonicStorageModule } from '@ionic/storage'


export function createTraslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule  ,     IonicSelectableModule , 
    HttpClientModule, 
    IonicStorageModule.forRoot() , 
    TranslateModule.forRoot({
      loader : {
        provide : TranslateLoader, 
        useFactory : (createTraslateLoader) , 
        deps : [HttpClient]
      }

    })

  
  ],

  providers: [
    
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
