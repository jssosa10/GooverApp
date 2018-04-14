import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BienvenidaPage } from '../bienvenida/bienvenida';
import { CursosPage } from '../cursos/cursos';
import { PerfilPage } from '../perfil/perfil';
import { InstitucionesPage } from '../instituciones/instituciones';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.rootPage = BienvenidaPage;
    this.loginPage = LoginPage;
    this.bienvenidaPage = BienvenidaPage;
    this.cursosPage = CursosPage;
    this.perfilPage = PerfilPage;
    this.institucionesPage= InstitucionesPage;

    console.log( this.navParams);
    console.log('oh oh '+ this.navParams.get('ruta'));
    if (this.navParams.get('ruta')) {
 
      if (this.navParams.get('ruta') === 'CursosInstitucion'|| this.navParams.get('ruta') === 'Curso') {
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

  }

  ngOnInit() {
  }

  openPage(p) {
    console.log(p);
    this.rootPage = p;
  }

  desloguear() {
    this.navCtrl.setRoot('Login');
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
