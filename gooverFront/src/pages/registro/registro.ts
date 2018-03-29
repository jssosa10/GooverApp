import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';

@IonicPage
({
  name: 'Registro'
})
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  constructor(public navCtrl: NavController) {

  }

  onRegistro()
  {
    this.navCtrl.setRoot('Bienvenida');
  }

  onLogin()
  {
    this.navCtrl.setRoot('Login');
  }


}