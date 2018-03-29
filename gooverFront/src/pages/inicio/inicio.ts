import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage
({
  name: 'Inicio'
})
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {


  constructor(public navCtrl: NavController) {

  }

}