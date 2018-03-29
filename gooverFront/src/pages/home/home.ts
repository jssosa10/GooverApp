import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { RegistroPage } from '../registro/registro';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage;
  private inicioPage;
  private loginPage;
  private registroPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = LoginPage;
    this.inicioPage = InicioPage;
    this.loginPage = LoginPage;
    this.registroPage = RegistroPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.rootPage = p;
  }

}