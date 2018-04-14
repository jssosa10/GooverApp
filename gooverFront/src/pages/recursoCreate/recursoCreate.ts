import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'recursoCreate.html'
})
export class RecursoCreatePage {

  titulo: string;
  formgroup: FormGroup;
  nombre: AbstractControl;
  descripcion: AbstractControl;
  isLogged: boolean;
  imageURI: any;
  imageFileName: any;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController

  ) {
    console.log(params);

    console.log(params.get('tema'));
    console.log(params.get('subtema'));


    this.formgroup = formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.nombre = this.formgroup.controls['nombre'];
    this.descripcion = this.formgroup.controls['descripcion'];



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

  uploadFile() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}