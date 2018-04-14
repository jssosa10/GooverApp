import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@IonicPage
  ({
    name: 'Perfil'
  })
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  formgroup: FormGroup;
  pass: AbstractControl;
  pass2: AbstractControl;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public formBuilder: FormBuilder, private auth:AuthService) {
      if (!this.navParams.get('menu')) {
        navCtrl.setRoot(HomePage, { ruta: 'Perfil' })
      }

      this.formgroup = formBuilder.group({
        pass: ['', Validators.required],
        pass2: ['', Validators.required]
      })
    this.pass= this.formgroup.controls['pass'];
    this.pass2= this.formgroup.controls['pass2'];
    this.username=auth.getUserName();
    }
  

}