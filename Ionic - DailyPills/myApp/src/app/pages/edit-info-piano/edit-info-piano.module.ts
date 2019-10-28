import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditInfoPianoPage } from './edit-info-piano.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: EditInfoPianoPage
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
  declarations: [EditInfoPianoPage]
})
export class EditInfoPianoPageModule {}
