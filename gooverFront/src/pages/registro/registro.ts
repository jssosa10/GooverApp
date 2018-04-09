import { Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage
  ({
    name: 'Registro'
  })
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  formgroup: FormGroup;
  userName: AbstractControl;
  pass: AbstractControl;
  pass2: AbstractControl;

  constructor(public navCtrl: NavController,public navParams: NavParams, public menuService: MenuService
  ,public formBuilder: FormBuilder, public http: Http) {
  
    this.formgroup = formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', Validators.required],
      pass2: ['', Validators.required]
    })
    this.userName= this.formgroup.controls['userName'];
    this.pass= this.formgroup.controls['pass'];
    this.pass2= this.formgroup.controls['pass2'];

  }

  onRegistro() {
    this.http.post('54.197.214.217:9000', JSON.stringify(this.formgroup)).subscribe((response: Response) => {
      console.log('test');
  }, error => {
    console.log(JSON.stringify(error.json()));
  });
    this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' });
  }

  onLogin() {
    this.navCtrl.setRoot('Login');
  }

  openLogin() {
    this.navCtrl.setRoot('Login');
  }

  openRegistro() {
    this.navCtrl.setRoot('Registro');
  }


}