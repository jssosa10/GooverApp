import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RecursoDetailPage } from './recursoDetail';

@NgModule({
  declarations: [
    RecursoDetailPage
  ],
  imports: [
    IonicPageModule.forChild(RecursoDetailPage)
  ],
  exports: [
    RecursoDetailPage
  ]
})
export class RecursoDetailPageModule { }