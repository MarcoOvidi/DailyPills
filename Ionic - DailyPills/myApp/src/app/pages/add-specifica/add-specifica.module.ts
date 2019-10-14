import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSpecificaPage } from './add-specifica.page';

const routes: Routes = [
  {
    path: '',
    component: AddSpecificaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      AddSpecificaPage
  ],
})
export class AddSpecificaPageModule {}
