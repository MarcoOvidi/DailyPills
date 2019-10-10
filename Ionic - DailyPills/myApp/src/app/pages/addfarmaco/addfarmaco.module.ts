import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddfarmacoPage } from './addfarmaco.page';

const routes: Routes = [
  {
    path: '',
    component: AddfarmacoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddfarmacoPage]
})
export class AddfarmacoPageModule {}
