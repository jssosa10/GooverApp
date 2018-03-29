import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage
({
  name: 'Bienvenida'
})
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html'
})
export class BienvenidaPage {

  constructor(public navCtrl: NavController) {

  }

  onEmpezar()
  {    
    this.navCtrl.setRoot('Cursos');
  }

}