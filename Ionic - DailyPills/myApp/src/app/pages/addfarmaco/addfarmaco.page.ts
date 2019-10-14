import { Component, OnInit } from '@angular/core';
import { FarmacoServices } from '../../services/farmaco.services';
import { Farmaco } from '../../models/farmaco.model';
import { ModalController } from '@ionic/angular';
import { AddSpecificaPage } from '../add-specifica/add-specifica.page';
import {Specifica} from '../../models/specifica.model';

@Component({
  selector: 'app-addfarmaco',
  templateUrl: './addfarmaco.page.html',
  styleUrls: ['./addfarmaco.page.scss']
})

export class AddfarmacoPage implements OnInit {
  private farmaciList$: Farmaco[];
  private farmaci$: Farmaco[];

  constructor(
      private farmacoServices: FarmacoServices,
      private modalController: ModalController
  ) {}

  ngOnInit() {
    this.farmacoServices.listFarmaci().subscribe((arrMed) => {
      this.farmaciList$ = arrMed;
      this.farmaci$ = arrMed;
    });
  }

  async presentModal(farmacoName: string, formati: Specifica[]) {
    const modal = await this.modalController.create({
      component: AddSpecificaPage,
      cssClass: 'dialog-modal',
      animated: true,
      componentProps: {
        firstName: farmacoName,
        formati
      }
    });

    modal.onDidDismiss().then((detail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    return await modal.present();
  }

  liveMedicineFilter($event) {
    console.log('filtering');
    this.farmaciList$ = this.farmaci$.filter((val) => val.nome.toLowerCase().includes($event.target.value.toLowerCase()));
  }

}
