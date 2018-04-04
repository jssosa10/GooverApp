import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';

@IonicPage
  ({
    name: 'Cursos'
  })
@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html'
})
export class CursosPage {

  myInput = "";
  cursos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService) {
    if (!this.navParams.get('menu')) {
      navCtrl.setRoot(HomePage, { ruta: 'Cursos' })
    }
  }

  setItems() {
    this.cursos = [
      { titulo: 'HTML1', descripcion: 'Curso chevere de HTML', img: 'pipo.jpg' },
      { titulo: 'Cálculo Diferencial', descripcion: 'Curso chevere de Calculo Dif', img: 'pipo.jpg' },
      { titulo: 'Ionic', descripcion: 'Curso para aprender ionic como io', img: 'logo.png' },
      { titulo: 'HTML11', descripcion: 'Curso chevere de HTML', img: 'pipo.jpg' },
      { titulo: 'Diferencial', descripcion: 'Curso chevere de Calculo Dif', img: 'pipo.jpg' },
      { titulo: 'Ionic', descripcion: 'Curso para aprender ionic como io', img: 'logo.png' },
      { titulo: 'HTML2', descripcion: 'Curso chevere de HTML', img: 'pipo.jpg' },
      { titulo: 'Diferencial', descripcion: 'Curso chevere de Calculo Dif', img: 'pipo.jpg' },
      { titulo: 'Ionic', descripcion: 'Curso para aprender ionic como io', img: 'logo.png' },
      { titulo: 'HTML22', descripcion: 'Curso chevere de HTML', img: 'pipo.jpg' },
      { titulo: 'Diferencial', descripcion: 'Curso chevere de Calculo Dif', img: 'pipo.jpg' },
      { titulo: 'Ionic', descripcion: 'Curso para aprender ionic como io', img: 'logo.png' }
    ];
  }

  ngOnInit() {
    this.setItems();
  }

  onCurso(id) {
    this.navCtrl.setRoot(HomePage, { ruta: 'Curso', parametros: { id: '2', menu: true } })
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.cursos = this.cursos.filter(function(curso) {
        return curso.titulo.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

}