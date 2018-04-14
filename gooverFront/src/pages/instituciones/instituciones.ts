import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@IonicPage
  ({
    name: 'Instituciones'
  })
@Component({
  selector: 'page-instituciones',
  templateUrl: 'instituciones.html'
})
export class InstitucionesPage {

  myInput = "";
  instituciones: any;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService) {
  if (!this.navParams.get('menu')) {
     navCtrl.setRoot(HomePage, { ruta: 'Instituciones' })
    }
    this.username=auth.getUserName();
  }

  setItems() {
    this.instituciones = [
      { titulo: 'Universidad de los Andes', img: 'andes.png' },
      { titulo: 'Universidad Nacional', img: 'unal.png' },
      { titulo: 'Universidad Javeriana', img: 'javeriana.png' }
    ];
  }

  ngOnInit() {
    this.setItems();
  }

  onInstitucion(id) {
    this.navCtrl.push('CursosInstitucion', { id: '2',menu:true});
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.instituciones = this.instituciones.filter(function (institucion) {
        return institucion.titulo.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  volverAtras() {
    console.log('llegaAtras')
    this.navCtrl.pop();
  }

}