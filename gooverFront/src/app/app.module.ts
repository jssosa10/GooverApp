import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import { RegistroPage } from '../pages/registro/registro';
import { LoginPageModule } from '../pages/login/login.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { BienvenidaPage } from '../pages/bienvenida/bienvenida';
import { BienvenidaPageModule } from '../pages/bienvenida/bienvenida.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    InicioPageModule,
    RegistroPageModule,
    PerfilPageModule,
    BienvenidaPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InicioPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
