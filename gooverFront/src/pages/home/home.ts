import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { RegistroPage } from '../registro/registro';
import { BienvenidaPage } from '../bienvenida/bienvenida';
import { CursosPage } from '../cursos/cursos';
import { CursoDetailPage } from '../cursoDetail/cursoDetail';
import { PerfilPage } from '../perfil/perfil';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage;
  private parametros;
  private inicioPage;
  private loginPage;
  private registroPage;
  private bienvenidaPage;
  private cursosPage;
  private perfilPage;
  subscription: any;
  private width;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.rootPage = BienvenidaPage;
    this.inicioPage = InicioPage;
    this.loginPage = LoginPage;
    this.registroPage = RegistroPage;
    this.bienvenidaPage = BienvenidaPage;
    this.cursosPage = CursosPage;
    this.perfilPage = PerfilPage;


    if (this.navParams.get('ruta')) {
      if (this.navParams.get('ruta') === 'Cursos') {
        this.parametros = this.navParams.get('parametros');
      }
      else {
        this.parametros = { menu: true };
      }
      this.rootPage = navParams.get('ruta');
    }

    platform.ready().then((readySource) => {
      this.width = platform.width();
    });

  }

  ngOnInit() {
  }

  openPage(p) {
    console.log(p);
    this.rootPage = p;
  }

  desloguear() {

  }

  altura() {
    if (this.width > 912) {
      return '130px';
    }
    else {
      return '270px';
    }
  }

  ancho() {
    if (this.width > 912) {
      return '150px';
    }
    else {
      return '270px';
    }
  }

  getMyStyles() {
    let myStyles = {
      'max-width': this.altura(),
      'max-height': this.ancho()
    };
    return myStyles;
  }
}
