import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { RecursoService } from '../../services/recurso.service';

@IonicPage
  ({
    name: 'RecursoDetail',
    segment: 'recurso/:id'
  })
@Component({
  selector: 'page-recursoDetail',
  templateUrl: 'recursoDetail.html'
})
export class RecursoDetailPage {

  recurso: any;
  id: any;
  cargado: boolean=false;
  pdfSrc:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recurs: RecursoService) {
    this.id = this.navParams.get('id');
  }
  setItems() {
    let headerOptions: any = { 'Content-Type': 'application/json' };
    let myParams = new URLSearchParams();
    let headers = new Headers(headerOptions);
    this.recurs.getRecurso(headers, this.id)
      .subscribe(
        rs => this.recurso = rs,
        er => console.log(er),
        () => {
          if (this.recurso === 'error') {
            console.log('Recursos mal');
          }
          console.log('antes')
          console.log(this.recurso);
          console.log(this.extractText(this.recurso));
          this.pdfSrc=this.extractText(this.recurso);
          console.log('despues')
          this.cargado=true;
        }
        
      )
     
  }

 extractText( str ){
    var ret = "";
  
    if ( /"/.test( str ) ){
      ret = str.match( /"(.*?)"/ )[1];
    } else {
      ret = str;
    }
  
    return ret;
  }

  ngOnInit() {
    this.setItems();
  }

  estaCargado()
  {
    return this.cargado;
  }
}