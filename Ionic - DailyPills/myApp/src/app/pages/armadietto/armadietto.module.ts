import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArmadiettoPage } from './armadietto.page';

const routes: Routes = [
  {
    path: '',
    component: ArmadiettoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArmadiettoPage]
})
export class ArmadiettoPageModule {}
