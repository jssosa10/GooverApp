import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BienvenidaPage } from '../bienvenida/bienvenida';
import { CursosPage } from '../cursos/cursos';
import { PerfilPage } from '../perfil/perfil';
import { InstitucionesPage } from '../instituciones/instituciones';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage;
  private parametros;
  private loginPage;
  private bienvenidaPage;
  private cursosPage;
  private perfilPage;
  private institucionesPage;
  private width;
  private username;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private auth: AuthService) {
    this.rootPage = InstitucionesPage;
    this.loginPage = LoginPage;
    this.bienvenidaPage = BienvenidaPage;
    this.cursosPage = CursosPage;
    this.perfilPage = PerfilPage;
    this.institucionesPage = InstitucionesPage;

    console.log(this.navParams);
    console.log('oh oh ' + this.navParams.get('ruta'));
    if (this.navParams.get('ruta')) {
      console.log(this.navParams.get('parametros'));
      if (this.navParams.get('ruta') === 'CursosInstitucion' || this.navParams.get('ruta') === 'Curso' || this.navParams.get('parametros')) {
        console.log('llega')
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
    this.username = auth.getUserName();
  }

  ngOnInit() {
  }

  openPage(p) {
    console.log(p);
    this.parametros = { menu: false };
    if (p == this.institucionesPage) {
      this.navCtrl.setRoot(HomePage, { ruta: 'Instituciones', parametros: { menu: false } })
    }
    if (p == this.cursosPage) {
      this.navCtrl.setRoot(HomePage, { ruta: 'Cursos', parametros: { menu: false } })
    }
    if (p == this.perfilPage) {
      this.navCtrl.setRoot(HomePage, { ruta: 'Perfil', parametros: { menu: false } })
    }
    if (p == this.bienvenidaPage) {
      this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida', parametros: { menu: false } })
    }

  }

  desloguear() {
    this.navCtrl.setRoot('Login');
  }

  volverAInicio() {
    this.navCtrl.setRoot('Inicio');
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
