import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';

@IonicPage
  ({
    name: 'Registro'
  })
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  constructor(public navCtrl: NavController,public navParams: NavParams, public menuService: MenuService) {
  
  }

  onRegistro() {
    this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' });
  }

  onLogin() {
    this.navCtrl.setRoot('Login');
  }

  openLogin() {
    this.navCtrl.setRoot('Login');
  }

  openRegistro() {
    this.navCtrl.setRoot('Registro');
  }


}