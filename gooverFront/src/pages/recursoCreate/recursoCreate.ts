import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
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
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
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
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}