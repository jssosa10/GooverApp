import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@IonicPage
  ({
    name: 'CursosInstitucion',
    segment: 'institucion/:id/cursos'
  })
@Component({
  selector: 'page-cursosInst',
  templateUrl: '../cursos/cursos.html'
})
export class CursosInstitucionPage {

  myInput = "";
  username: string;
  cursos: any;
  id:any;
  institucion:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService) {
    console.log('al menos');
    this.username=auth.getUserName();
    this.id=this.navParams.get('id');
    if (!this.navParams.get('menu')) {
      navCtrl.setRoot(HomePage, { ruta: 'CursosInstitucion', parametros:{ id: '2',menu:true} });
    }   
    this.institucion=this.id;
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
    this.navCtrl.push('Curso', { id: '2',menu:true});
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