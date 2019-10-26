import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Preferito} from '../../models/preferito.model';
import { ModalController, NavController } from '@ionic/angular';
import { FarmacoServices } from '../../services/farmaco.services';
import { PopupPage } from '../popup/popup.page';

@Component({
  selector: 'app-scegli-farmaco',
  templateUrl: './scegli-farmaco.page.html',
  styleUrls: ['./scegli-farmaco.page.scss'],
})
export class ScegliFarmacoPage implements OnInit {

  private listfavorites$: Observable<Preferito[]>;

  constructor(
      private navController: NavController,
      private farmacoServices: FarmacoServices,
      private modalController: ModalController
  ) { }

  ngOnInit() {
    this.listfavorites$ = this.farmacoServices.favoritesFarmaci();
  }

  async addFarmacoPiano(preferito: Preferito) {
    const modal = await this.modalController.create({
      component: PopupPage,
      cssClass: 'dialog-modal',
      animated: true,
      componentProps: {
        idmedtype: preferito.id,
        farmacoName: preferito.farmaco.nome,
        specifica: preferito.specifica
      }
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    return await modal.present();
  }

  farmacoDetailNav() {

  }

}
