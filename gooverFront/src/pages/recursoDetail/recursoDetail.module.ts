import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RecursoDetailPage } from './recursoDetail';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    RecursoDetailPage
  ],
  imports: [
    PdfViewerModule,
    IonicPageModule.forChild(RecursoDetailPage)
  ],
  exports: [
    RecursoDetailPage
  ]
})
export class RecursoDetailPageModule { }