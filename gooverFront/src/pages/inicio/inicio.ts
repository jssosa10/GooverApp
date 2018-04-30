import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage
  ({
    name: 'Inicio'
  })
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
 private width: any;

  constructor(public navCtrl: NavController, platform: Platform) {
    platform.ready().then((readySource) => {
      this.width = platform.width();
    });
  }

  openLogin() {
    this.navCtrl.setRoot('Login');
  }

  openRegistro() {
    this.navCtrl.setRoot('Registro');
  }

  inicioSinLogin()
  {
    this.navCtrl.setRoot(HomePage, { ruta: 'Instituciones' })
  }

}