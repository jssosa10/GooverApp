import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CursosPage } from './cursos';

@NgModule({
  declarations: [
    CursosPage
  ],
  imports: [
    IonicPageModule.forChild(CursosPage)
  ],
  exports: [
    CursosPage
  ]
})
export class CursosPageModule { }