import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController } from 'ionic-angular';
import { RecursoService } from '../../services/recurso.service';
import { AuthService } from '../../services/auth.service';
import { CalificacionService } from '../../services/voto.service';

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
  cargado: boolean = false;
  pdfSrc: any;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recurs: RecursoService
    , private auth: AuthService, private alertCtrl: AlertController, private calif: CalificacionService) {
    console.log(this.id);
    this.id = this.navParams.get('id');
    this.username = auth.getUserName();
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
          this.pdfSrc = this.extractText(this.recurso);
          console.log('despues')
          this.cargado = true;
        }

      )
  }

  showPromptVoto() {
    let prompt = this.alertCtrl.create({
      title: 'Calificar',
      message: "Ingrese calificación para el recurso",
      inputs: [
        {
          name: 'title',
          placeholder: 'Calificación de 0 a 5',
          type: 'number',
          min:"0", 
          max:"5"
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Calificar',
          handler: data => {
            console.log('data ' + data.title);
            let f = { idRecurso: this.id, puntaje: data.title };
            this.calif.votacion(f).subscribe(
             er => console.log(er),
              () => {
              }
            )
          }
        }
      ]
    });
    prompt.present();
  }

  extractText(str) {
    var ret = "";

    if (/"/.test(str)) {
      ret = str.match(/"(.*?)"/)[1];
    } else {
      ret = str;
    }

    return ret;
  }

  ngOnInit() {
    this.setItems();
  }

  estaCargado() {
    return this.cargado;
  }
}