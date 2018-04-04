import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage
({
  name: 'Curso',
  segment: 'curso/:id'
})
@Component({
  selector: 'page-cursoDetail',
  templateUrl: 'cursoDetail.html'
})
export class CursoDetailPage {

    curso:any;
    id:any;
    
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.id=this.navParams.get('id');
    this.curso={titulo:'Calculo Diferencial',descripcion:'Curso chevere de HTML',img:'pipo.jpg',
    temas:[{nombre:'limites',recursos:[
      {nombre:'Video Julio Profe',calificacion:'5',tipo:'Web'},
      {nombre:'Video Julio Profe 2',calificacion:'4.9',tipo:'Web'}]},
    {nombre:'derivadas',recursos:[{nombre:'Stewart1',calificacion:'4',tipo:'book'}]},
    {nombre:'integrales',recursos:[{nombre:'Stewart2',calificacion:'4.5',tipo:'book'}]}
  ]};
  }

  toggleSection(i) {
    this.curso.temas[i].open = !this.curso.temas[i].open;
  }
 
  toggleItem(i, j) {
    this.curso.temas[i].recursos[j].open = !this.curso.temas[i].recursos[j].open;
  }

  onRecurso(id)
  {
    
    //this.navCtrl.setRoot(RegistroPage);
  }

}