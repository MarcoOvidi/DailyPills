import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioPianoPage } from './dettaglio-piano.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DettaglioPianoPage,
    children: [
      {
        path: 'dettaglio',
        children: [
          {
            path: '',
            loadChildren: '../dettaglio-piano-sub-tab-left/dettaglio-piano-sub-tab-left.module#DettaglioPianoSubTabLeftPageModule'
          }
        ]
      },
      {
<<<<<<< HEAD
        path: 'farmaci',
=======
        path: 'medicinePiano',
>>>>>>> b4cf4ebaf9240ea5c2efbb0670088ac3843f5358
        children: [
          {
            path: '',
            loadChildren: '../dettaglio-piano-sub-tab-right/dettaglio-piano-sub-tab-right.module#DettaglioPianoSubTabRightPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/piani/dettaglio-piano/dettaglio',
        pathMatch: 'full'
      }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [DettaglioPianoPage]
})
export class DettaglioPianoPageModule {}
