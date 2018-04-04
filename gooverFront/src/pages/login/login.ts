import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage
  ({
    name: 'Login'
  })
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  formgroup: FormGroup;
  userName: AbstractControl;
  pass: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuService: MenuService, public formBuilder: FormBuilder) {
    // if(!this.navParams.get('menu'))
    //{
    // navCtrl.setRoot(HomePage,{ruta:'Login'})
    //}

    this.formgroup = formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', Validators.required]
    })
  this.userName= this.formgroup.controls['userName'];
  this.pass= this.formgroup.controls['pass'];
  }
  

  onLogin() {
    this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' });
    //this.menuService.emitNavChangeEvent('Bienvenida')
  }

  onRegistrar() {
    this.navCtrl.setRoot('Registro');
  }

  openLogin() {
    this.navCtrl.setRoot('Login');
  }

  openRegistro() {
    this.navCtrl.setRoot('Registro');
  }

}