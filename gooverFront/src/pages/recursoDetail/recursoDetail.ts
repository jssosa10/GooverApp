import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage
({
  name: 'Recurso',
  segment: 'recurso/:id'
})
@Component({
  selector: 'page-recursoDetail',
  templateUrl: 'recursoDetail.html'
})
export class RecursoDetailPage {

    recurso:any;
    id:any;
    
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.id=this.navParams.get('id');
    console.log(this.id);
    this.recurso={titulo:'Parciales sistrans',
    contenido:{imagenes:['Parcial1_1.jpg','Parcial1_2.jpg','Parcial1_3.jpg','Parcial1_4.jpg',
    'Parcial2_1.jpg','Parcial2_2.jpg','Parcial2_3.jpg','Parcial2_4.jpg']}};
  console.log(this.recurso);
  }
}