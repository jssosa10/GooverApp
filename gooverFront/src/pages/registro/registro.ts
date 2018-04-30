import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  isLogged: boolean;
  intento: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private auth: AuthService) {
    this.intento = false;
    this.formgroup = formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', Validators.required],
      pass2: ['', Validators.required]
    })
    this.userName = this.formgroup.controls['userName'];
    this.pass = this.formgroup.controls['pass'];
    this.pass2 = this.formgroup.controls['pass2'];

  }

  onRegistro() {
    this.intento = true;
    if (this.valido()) {
      let headerOptions: any = { 'Content-Type': 'application/json' };
      let headers = new Headers(headerOptions);
      let f = { username: this.formgroup.get('userName').value, password: this.formgroup.get('pass').value };
      this.auth.register(f, headers)
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
    return this.loginValido() && this.passValida() && this.pass2Valida();
  }

  loginValido() {
    return !this.intento || this.formgroup.get('userName').valid;
  }

  passValida() {
    return !this.intento || this.formgroup.get('pass').valid;
  }

  pass2Valida() {
    return !this.intento || this.formgroup.get('pass2').valid;
  }

  passNoCoinciden()
  {
    return this.intento && this.formgroup.get('pass2')!== this.formgroup.get('pass') && this.formgroup.get('pass').valid && this.formgroup.get('pass2').valid;
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
