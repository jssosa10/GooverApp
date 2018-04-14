import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { BienvenidaPageModule } from '../pages/bienvenida/bienvenida.module';
import { CursosInstitucionPageModule } from '../pages/cursosInstitucion/cursosInstitucion.module';
import { CursosPageModule } from '../pages/cursos/cursos.module';
import { InstitucionesPageModule } from '../pages/instituciones/instituciones.module';
import { RecursoCreatePageModule } from '../pages/recursoCreate/recursoCreate.module';
import { HomePage } from '../pages/home/home';
import { AutoresizeDirective } from '../services/autoresize';
import { InstitucionesService } from '../services/instituciones.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutoresizeDirective
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    InicioPageModule,
    RegistroPageModule,
    PerfilPageModule,
    BienvenidaPageModule,
    CursosInstitucionPageModule,
    CursosPageModule,
    InstitucionesPageModule,
    RecursoCreatePageModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    InstitucionesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
