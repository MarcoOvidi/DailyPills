import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettaglioPianoPage } from './dettaglio-piano.page';
import { TranslateModule } from '@ngx-translate/core';
import {SuperTabsModule} from '@ionic-super-tabs/angular';

const routes: Routes = [
    {
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
