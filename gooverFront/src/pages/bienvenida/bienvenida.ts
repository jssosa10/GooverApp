import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, App } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';

@IonicPage
  ({
    name: 'Bienvenida'
  })
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html'
})
export class BienvenidaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public menuService: MenuService, public appCtrl:App) {
    if (!this.navParams.get('menu')) {
      navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' })
    }
  }

  onEmpezar() {
   // this.menuService.emitNavChangeEvent('Instituciones')
  // this.navCtrl.push('Instituciones');
   this.navCtrl.setRoot(HomePage, { ruta: 'Instituciones', parametros: { id: '2', menu: true } })
  }

}