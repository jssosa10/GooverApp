import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CursoDetailPage } from './cursoDetail';

@NgModule({
  declarations: [
    CursoDetailPage
  ],
  imports: [
    IonicPageModule.forChild(CursoDetailPage)
  ],
  exports: [
    CursoDetailPage
  ]
})
export class CursosDetailPageModule { }