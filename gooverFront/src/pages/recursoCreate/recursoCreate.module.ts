import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RecursoCreatePage } from './recursoCreate';

@NgModule({
  declarations: [
    RecursoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RecursoCreatePage),
  ],
  entryComponents: [
    RecursoCreatePage,
  ]
})
export class RecursoCreatePageModule {}