import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Preferito} from '../../models/preferito.model';
import { ModalController, NavController } from '@ionic/angular';
import { FarmacoServices } from '../../services/farmaco.services';
import { PopupPage } from '../popup/popup.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scegli-farmaco',
  templateUrl: './scegli-farmaco.page.html',
  styleUrls: ['./scegli-farmaco.page.scss'],
})
export class ScegliFarmacoPage implements OnInit {

  private listfavorites$: Observable<Preferito[]>;
  private idPiano$: number;

  constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private farmacoServices: FarmacoServices,
      private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idPiano$ = JSON.parse(params.preferito);
    });
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
        specifica: preferito.specifica,
        idpiano: this.idPiano$
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
