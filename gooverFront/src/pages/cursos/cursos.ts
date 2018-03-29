import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage
({
  name: 'Cursos'
})
@Component({
  selector: 'page-cursos',
  templateUrl: 'cursos.html'
})
export class CursosPage {

    myInput="";

    cursos=[
        {titulo:'HTML',descripcion:'Curso chevere de HTML',img:'pipo.jpg'},
        {titulo:'Diferencial',descripcion:'Curso chevere de Calculo Dif',img:'pipo.jpg'},
        {titulo:'Ionic',descripcion:'Curso para aprender ionic como io',img:'logo.png'},
        {titulo:'HTML',descripcion:'Curso chevere de HTML',img:'pipo.jpg'},
        {titulo:'Diferencial',descripcion:'Curso chevere de Calculo Dif',img:'pipo.jpg'},
        {titulo:'Ionic',descripcion:'Curso para aprender ionic como io',img:'logo.png'},
        {titulo:'HTML',descripcion:'Curso chevere de HTML',img:'pipo.jpg'},
        {titulo:'Diferencial',descripcion:'Curso chevere de Calculo Dif',img:'pipo.jpg'},
        {titulo:'Ionic',descripcion:'Curso para aprender ionic como io',img:'logo.png'},
        {titulo:'HTML',descripcion:'Curso chevere de HTML',img:'pipo.jpg'},
        {titulo:'Diferencial',descripcion:'Curso chevere de Calculo Dif',img:'pipo.jpg'},
        {titulo:'Ionic',descripcion:'Curso para aprender ionic como io',img:'logo.png'}
    ]
  constructor(public navCtrl: NavController) {

  }

  onInput($event)
  {

  }

  onCurso(id)
  {
    
    //this.navCtrl.setRoot(RegistroPage);
  }

}