import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';

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

  onRegistrar()
  {
    this.navCtrl.setRoot(RegistroPage);
  }

}