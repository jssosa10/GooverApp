import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { RecursoCreatePage } from '../recursoCreate/recursoCreate';

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

  curso: any;
  id: any;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private auth: AuthService, public modalCtrl: ModalController) {
    if (!this.navParams.get('menu')) {
      console.log('a cambiar');
      navCtrl.setRoot(HomePage, { ruta: 'Curso', parametros: { id: '3', menu: true } });
    }
    this.id = this.navParams.get('id');
    this.curso = {
      titulo: 'Calculo Diferencial', descripcion: 'Curso chevere de HTML', img: 'pipo.jpg',
      temas: [{
        nombre: 'limites', recursos: [
          { nombre: 'Video Julio Profe', calificacion: '5', tipo: 'Web' },
          { nombre: 'Video Julio Profe 2', calificacion: '4.9', tipo: 'Web' }]
      },
      { nombre: 'derivadas', subtemas: [{ nombre: 'Subtema1', recursos: [{ nombre: 'Stewart1', calificacion: '4', tipo: 'book' }] }], recursos: [{ nombre: 'Stewart1', calificacion: '4', tipo: 'book' }] },
      { nombre: 'integrales', recursos: [{ nombre: 'Stewart2', calificacion: '4.5', tipo: 'book' }] }
      ]
    };
    this.username = auth.getUserName();
  }

  toggleSection(i) {
    this.curso.temas[i].open = !this.curso.temas[i].open;
  }

  toggleItem(i, j) {
    this.curso.temas[i].recursos[j].open = !this.curso.temas[i].recursos[j].open;
  }

  toggleSubtema(i, j) {
    this.curso.temas[i].subtemas[j].open = !this.curso.temas[i].subtemas[j].open;
  }

  onRecurso(i, j) {
    //this.navCtrl.setRoot(RegistroPage);
    if (j!== undefined) {
      let myModal = this.modalCtrl.create(RecursoCreatePage, { 'subtema': this.curso.temas[i].subtemas[j] });
      myModal.present();
    }
    else {
      let myModal = this.modalCtrl.create(RecursoCreatePage, { 'tema': this.curso.temas[i] });
      myModal.present();
    }

  }

  showPromptTema() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo tema',
      message: "Ingrese un nuevo tema para el curso: " + this.curso.titulo,
      inputs: [
        {
          name: 'title',
          placeholder: 'Nombre del nuevo tema'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('data ' + data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  showPromptSubtema(i) {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo tema',
      message: "Ingrese un nuevo subtema para el tema: " + this.curso.temas[i].nombre,
      inputs: [
        {
          name: 'title',
          placeholder: 'Nombre del nuevo subtema'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('data ' + data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}