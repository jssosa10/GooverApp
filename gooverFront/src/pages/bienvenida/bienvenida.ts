import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@IonicPage
  ({
    name: 'Bienvenida'
  })
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html'
})
export class BienvenidaPage {

  username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private auth:AuthService) {
    if (!this.navParams.get('menu')) {
      navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' })
    }
    this.username=auth.getUserName();
  }

  onEmpezar() {
   // this.menuService.emitNavChangeEvent('Instituciones')
   this.navCtrl.setRoot(HomePage, { ruta: 'Cursos' })
   //this.navCtrl.setRoot(HomePage, { ruta: 'Instituciones', parametros: { id: '2', menu: true } })
  }

}