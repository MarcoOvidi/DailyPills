import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';
// import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        children: [
          {
            path: '',
            loadChildren: '../homepage/homepage.module#HomepagePageModule'
          },
          {
            path: 'dettaglio-assunzione',
            loadChildren: '../dettaglio-assunzione/dettaglio-assunzione.module#DettaglioAssunzionePageModule'
          }
        ]
      },
      {
        path: 'armadietto',
        children: [
          {
            path: '',
            loadChildren: '../armadietto/armadietto.module#ArmadiettoPageModule'
          },
          {
            path: 'dettaglio',
            loadChildren: '../dettaglio-farmaco/dettaglio-farmaco.module#DettaglioFarmacoPageModule'
          },
          {
            path: 'addFarmaco',
            loadChildren: '../addfarmaco/addfarmaco.module#AddfarmacoPageModule'
          }
        ]
      },
      {
        path: 'piani',
        children: [
          {
            path: '',
            loadChildren: '../lista-piani/lista-piani.module#ListaPianiPageModule'
          },
          {
            path: 'dettaglio-piano',
            loadChildren: '../dettaglio-piano/dettaglio-piano.module#DettaglioPianoPageModule'
          },
          {
            path: 'nuovo-piano',
            loadChildren: '../nuovo-piano/nuovo-piano.module#NuovoPianoPageModule'
          },
          {
            path: 'update',
            loadChildren: '../edit-info-piano/edit-info-piano.module#EditInfoPianoPageModule'
          }
        ]
      },
      {
        path: 'piani/dettaglio-piano/scegli-farmaco',
        children: [
          {
            path: '',
            loadChildren: '../scegli-farmaco/scegli-farmaco.module#ScegliFarmacoPageModule'
          }
        ]
      },
      {
        path: 'homepage/dettaglio-assunzione',
        children: [
          {
            path: '',
            loadChildren: '../dettaglio-assunzione/dettaglio-assunzione.module#DettaglioAssunzionePageModule'
          }
        ]
      },
      {
        path: 'piani/dettaglio-piano/dettaglio-assunzione',
        children: [
          {
            path: '',
            loadChildren: '../dettaglio-assunzione/dettaglio-assunzione.module#DettaglioAssunzionePageModule'
          }
        ]
      },
      {
        path: 'impostazioni',
        children: [
          {
            path: '',
            loadChildren: '../impostazioni/impostazioni.module#ImpostazioniPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/homepage',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
