import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InicioPage } from '../inicio/inicio';
import { RegistroPage } from '../registro/registro';
import { BienvenidaPage } from '../bienvenida/bienvenida';
import { CursosPage } from '../cursos/cursos';
import { CursoDetailPage } from '../cursoDetail/cursoDetail';
import { PerfilPage } from '../perfil/perfil';
import { MenuService } from '../../service/menu.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage;
  private parametros;
  private inicioPage;
  private loginPage;
  private registroPage;
  private bienvenidaPage;
  private cursosPage;
  private perfilPage;
  subscription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuService: MenuService) {
    this.rootPage = BienvenidaPage;
    this.inicioPage = InicioPage;
    this.loginPage = LoginPage;
    this.registroPage = RegistroPage;
    this.bienvenidaPage = BienvenidaPage;
    this.cursosPage = CursosPage;
    this.perfilPage= PerfilPage;
    menuService.setMenuActivo();
 
    if (this.navParams.get('ruta')){
      if (this.navParams.get('ruta') === 'Cursos') {
       this.parametros=this.navParams.get('parametros');
      }
      else {
        this.parametros={menu:true};       
      }
      this.rootPage = navParams.get('ruta');
    }

  }

  ngOnInit() {
    this.subscription = this.menuService.getNavChangeEmitter()
      .subscribe(item => this.openPage(item));
  }

  openPage(p) {
    this.rootPage = p;
  }

  desloguear(){

  }



}