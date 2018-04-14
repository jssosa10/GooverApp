import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { InstitucionesService } from '../../services/instituciones.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private instit: InstitucionesService) {
    if (!this.navParams.get('menu')) {
      navCtrl.setRoot(HomePage, { ruta: 'Instituciones' })
    }
    this.username = auth.getUserName();
  }

  setItems() {
    let headerOptions: any = { 'Content-Type': 'application/json' };
    let headers = new Headers(headerOptions);
    this.instit.getInstituciones(headers)
      .subscribe(
        rs => this.instituciones = rs,
        er => console.log(er),
        () => {
          if (this.instituciones === 'error') {
            console.log('Instituciones mal');
            
          }
        }
      )

  }

  ngOnInit() {
    this.setItems();
  }

  onInstitucion(id) {
    this.navCtrl.push('CursosInstitucion', { id: id, menu: true });
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