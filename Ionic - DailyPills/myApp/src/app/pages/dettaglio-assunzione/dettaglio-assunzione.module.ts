import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioAssunzionePage } from './dettaglio-assunzione.page';

const routes: Routes = [
  {
    path: '',
    component: DettaglioAssunzionePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettaglioAssunzionePage]
})
export class DettaglioAssunzionePageModule {}
