import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioPianoPage } from './dettaglio-piano.page';
import { TranslateModule } from '@ngx-translate/core';
import {SuperTabsModule} from '@ionic-super-tabs/angular';

const routes: Routes = [
<<<<<<< HEAD
    {
=======
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
        path: 'farmaci',
        children: [
          {
            path: '',
            loadChildren: '../dettaglio-piano-sub-tab-right/dettaglio-piano-sub-tab-right.module#DettaglioPianoSubTabRightPageModule'
          }
        ]
      },
      {
>>>>>>> c548a2ab93df3f2b5859e69ee6702b146bb0ebed
        path: '',
        component: DettaglioPianoPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        SuperTabsModule
    ],
  declarations: [DettaglioPianoPage]
})
export class DettaglioPianoPageModule {}
