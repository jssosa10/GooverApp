import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform } from 'ionic-angular';
import { MenuService } from '../../service/menu.service';
import { HomePage } from '../home/home';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

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
  userName: AbstractControl;
  pass: AbstractControl;
  pass2: AbstractControl;
  login: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuService: MenuService, public formBuilder: FormBuilder) {


      this.formgroup = formBuilder.group({
        userName: ['', Validators.required],
        pass: ['', Validators.required],
        pass2: ['', Validators.required]
      })
    this.userName= this.formgroup.controls['userName'];
    this.pass= this.formgroup.controls['pass'];
    this.pass2= this.formgroup.controls['pass2'];
    }
  

}