import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioPianoSubTabLeftPage } from './dettaglio-piano-sub-tab-left.page';

const routes: Routes = [
  {
    path: '',
    component: DettaglioPianoSubTabLeftPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettaglioPianoSubTabLeftPage]
})
export class DettaglioPianoSubTabLeftPageModule {}
