import { Component } from '@angular/core';
import { NavController, IonicPage,NavParams } from 'ionic-angular';
import { MenuService} from '../../service/menu.service';
import { HomePage } from '../home/home';

@IonicPage
({
  name: 'Login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,public navParams: NavParams, public menuService: MenuService) {
   // if(!this.navParams.get('menu'))
    //{
    // navCtrl.setRoot(HomePage,{ruta:'Login'})
    //}
  }

  onLogin()
  {
    this.navCtrl.setRoot(HomePage);
    //this.menuService.emitNavChangeEvent('Bienvenida')
  }

  onRegistrar()
  {
    this.navCtrl.setRoot('Registro');
  }

  openLogin() {
    this.navCtrl.setRoot('Login');
  }

  openRegistro() {
    this.navCtrl.setRoot('Registro');
  }

}