import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioPianoSubTabRightPage } from './dettaglio-piano-sub-tab-right.page';

const routes: Routes = [
  {
    path: '',
    component: DettaglioPianoSubTabRightPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettaglioPianoSubTabRightPage]
})
export class DettaglioPianoSubTabRightPageModule {}
