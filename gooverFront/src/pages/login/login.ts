import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage
({
  name: 'Login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  onLogin()
  {
    this.navCtrl.setRoot('Bienvenida');
  }

  onRegistrar()
  {
    this.navCtrl.setRoot('Registro');
  }

}