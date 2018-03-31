import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuService} from '../../service/menu.service';

@IonicPage
({
  name: 'Bienvenida'
})
@Component({
  selector: 'page-bienvenida',
  templateUrl: 'bienvenida.html'
})
export class BienvenidaPage {

  constructor(public navCtrl: NavController, public menuService: MenuService) {

  }

  onEmpezar()
  {    
    this.menuService.emitNavChangeEvent('Cursos')
  }

}