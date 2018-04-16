import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { RecursoService } from '../../services/recurso.service';

@Component({
  templateUrl: 'recursoCreate.html'
})
export class RecursoCreatePage {

  titulo: string;
  formgroup: FormGroup;
  nombre: AbstractControl;
  descripcion: AbstractControl;
  isLogged: boolean;
  resp:any;
  selectedFile = null;

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private recurs: RecursoService

  ) {
    console.log(params);

    console.log(params.get('tema'));
    console.log(params.get('subtema'));


    this.formgroup = formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.descripcion = this.formgroup.controls['descripcion'];
    this.nombre = this.formgroup.controls['nombre'];



    if (params.get('tema')) {
      this.titulo = "Nuevo recurso para tema";
    }
    else {
      this.titulo = "Nuevo recurso para subtemas";
    }
    console.log('t ' + this.titulo);

  }

  addRecurso() {

  }

  getImage() {

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.type);
    console.log(this.selectedFile.name);
    console.log(this.selectedFile.name.split('.')[1])
  }

  onUpload() {
    let namesito= this.selectedFile.name.split('.')[1];
    if(namesito)
    {
      namesito=this.nombre+"."+ namesito;
    }
    else{
      namesito=this.nombre;
    }
    this.recurs.agregarRecurso(this.selectedFile, this.formgroup.get('nombre').value, this.params.get('tema').id,this.params.get('subtema'))
    .subscribe(
      rs => this.resp = rs,
      er => console.log(er),
      () => {
        if (this.resp === 'error') {
          console.log('upload mal');
        }
      }
    )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}