import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
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
          }
        ]
      },
      {
        path: 'armadietto',
        children: [
          {
            path: '',
            loadChildren: '../armadietto/armadietto.module#ArmadiettoPageModule'
          }
        ]
      },
      {
        path: 'piani',
        children: [
          {
            path: '',
            loadChildren: '../lista-piani/lista-piani.module#ListaPianiPageModule'
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
    // TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
