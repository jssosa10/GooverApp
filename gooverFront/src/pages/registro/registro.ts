import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  onLogin()
  {
    this.navCtrl.setRoot('Login');
  }


}