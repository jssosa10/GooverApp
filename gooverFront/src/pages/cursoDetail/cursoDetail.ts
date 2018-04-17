import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { RecursoCreatePage } from '../recursoCreate/recursoCreate';
import { CursoDetailService } from '../../services/cursoDetail.service';
import { TemaService } from '../../services/tema.service';

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
  cargado: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private auth: AuthService,
    public modalCtrl: ModalController, private curs: CursoDetailService,
    private tem: TemaService) {
    console.log(this.id);
    //if (!this.navParams.get('menu')) {
    //console.log('a cambiar');
    //navCtrl.setRoot(HomePage, { ruta: 'Curso', parametros: { id: this.id, menu: true } });
    //}
    this.id = this.navParams.get('id');

    this.username = auth.getUserName();
  }

  setItems() {
    let headerOptions: any = { 'Content-Type': 'application/json' };
    let headers = new Headers(headerOptions);
    this.curs.getCurso(headers, this.id)
      .subscribe(
        rs => this.curso = rs,
        er => console.log(er),
        () => {
          if (this.curso === 'error') {
            console.log('Cursos mal');
            this.curso = {
              titulo: 'Calculo Diferencial',
              temas: [{
                nombre: 'limites', recursos: [
                  { nombre: 'Video Julio Profe', calificacion: '5', tipo: 'Web' },
                  { nombre: 'Video Julio Profe 2', calificacion: '4.9', tipo: 'Web' }]
              },
              { nombre: 'derivadas', subtemas: [{ nombre: 'Subtema1', recursos: [{ nombre: 'Stewart1', calificacion: '4', tipo: 'book' }] }], recursos: [{ nombre: 'Stewart1', calificacion: '4', tipo: 'book' }] },
              { nombre: 'integrales', recursos: [{ nombre: 'Stewart2', calificacion: '4.5', tipo: 'book' }] }
              ]
            };
          }
          console.log('oli');
          console.log(this.curso);
          console.log(this.curso.titulo);
          console.log(this.curso.temas);
          this.cargado = true;
        }
      )
  }

  estaCargado() {
    return this.cargado;
  }


  ngOnInit() {
    this.setItems();
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
    if (j !== undefined) {
      let myModal = this.modalCtrl.create(RecursoCreatePage, { 'tema': this.curso.temas[i], 'subtema': this.curso.temas[i].subtemas[j] });
      myModal.present();
    }
    else {
      let myModal = this.modalCtrl.create(RecursoCreatePage, { 'tema': this.curso.temas[i] });
      myModal.present();
    }
  }

  abrirRecurso(i, j, k) {
    console.log('i ' + i);
    console.log('j ' + j);
    console.log('k ' + k);
    let recurso;
    if (k !== undefined) {
      recurso = this.curso.temas[i].subtemas[j].recursos[k];
    }
    else {
      recurso = this.curso.temas[i].recursos[j];
    }
    this.navCtrl.push('RecursoDetail', { id: recurso.id });
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
          text: 'Crear',
          handler: data => {
            console.log('data ' + data.title);
            let f = { idCurso: this.curso.id, titulo: data.title };
            this.tem.agregarTema(f).subscribe(
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
          text: 'Crear',
          handler: data => {
            console.log('data ' + data.title);
            let f = { idTema: this.curso.temas[i].id, titulo: data.title };
            this.tem.agregarSubtema(f).subscribe(
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
}