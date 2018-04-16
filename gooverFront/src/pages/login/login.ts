import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  headers: Headers;
  options: RequestOptions;
  isLogged: boolean;
  intento: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private auth: AuthService) {
    this.intento = false;
    this.formgroup = formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', Validators.required]
    })
    this.userName = this.formgroup.controls['userName'];
    this.pass = this.formgroup.controls['pass'];
  }


  onLogin() {
    this.intento = true;
    console.log('va ' + this.valido())
    if (this.valido()) {
      //this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' });
      let headerOptions: any = { 'Content-Type': 'application/json' };
      let headers = new Headers(headerOptions);
      let f = { username: this.formgroup.get('userName').value, password: this.formgroup.get('pass').value };
      this.auth.login(f, headers)
        .subscribe(
          rs => this.isLogged = rs,
          er => console.log(er),
          () => {
            if (this.isLogged) {
              this.navCtrl.setRoot(HomePage, { ruta: 'Bienvenida' })
                .then(data => console.log(data),
                  error => console.log(error));
            } else {
              console.log('Acceso denegado');
            }
          }
        )
    }
  }

  valido() {
    return this.loginValido() && this.passValida();
  }

  loginValido() {
    return !this.intento || this.formgroup.get('userName').valid;
  }

  passValida() {
    return !this.intento || this.formgroup.get('pass').valid;
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