import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CursosInstitucionPage } from './cursosInstitucion';

@NgModule({
  declarations: [
    CursosInstitucionPage
  ],
  imports: [
    IonicPageModule.forChild(CursosInstitucionPage)
  ],
  exports: [
    CursosInstitucionPage
  ]
})
export class CursosInstitucionPageModule { }