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
  resp: any;
  selectedFile = null;
  intento: boolean;
  varCargando:boolean;

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private recurs: RecursoService

  ) {
    this.intento = false;
    this.varCargando=false;
    console.log(params);

    console.log(params.get('tema'));
    console.log(params.get('subtema'));


    this.formgroup = formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.descripcion = this.formgroup.controls['descripcion'];
    this.nombre = this.formgroup.controls['nombre'];



    if (params.get('subtema')) {
      
      this.titulo = "Nuevo recurso para subtema";
    }
    else {
      this.titulo = "Nuevo recurso para tema";
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

  valido() {
    return this.nombreValido()
  }

  nombreValido() {
    return !this.intento || this.formgroup.get('nombre').valid;
  }

  cargando()
  {
    return this.varCargando;
  }

  onUpload() {
    this.intento = true;
    if (this.valido()) {
      this.varCargando=true;
      this.recurs.agregarRecurso(this.selectedFile, this.formgroup.get('nombre').value, this.params.get('tema').id, this.params.get('subtema'), this.params.get('descripcion'))
        .subscribe(
          rs => this.resp = rs,
          er => console.log(er),
          () => {
            this.varCargando=false;
            if (this.resp === 'error') {
              console.log('upload mal');
            }
            else {
              this.viewCtrl.dismiss(true);
            }
          }
        )
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}