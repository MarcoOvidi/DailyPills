import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FarmacoServices } from '../../services/farmaco.services';
import { Preferito } from '../../models/preferito.model';
import { Observable } from 'rxjs';
import { Specifica } from '../../models/specifica.model';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-armadietto',
  templateUrl: './armadietto.page.html',
  styleUrls: ['./armadietto.page.scss'],
})
export class ArmadiettoPage implements OnInit {

  private listfavorites$: Observable<Preferito[]>;

  constructor(
      private navController: NavController,
      private farmacoServices: FarmacoServices,
      private alertController: AlertController
  ) { }

  ngOnInit() {
    this.listfavorites$ = this.farmacoServices.favoritesFarmaci();
  }

  addFarmaco() {
    this.navController.navigateForward('addfarmaco');
  }

  farmacoDetailNav(farmaco: Specifica) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        preferito: JSON.stringify(farmaco)
      }
    };

    this.navController.navigateForward(['dettaglio-farmaco'], navigationExtras);
  }

  async delete(farmaco: Preferito) {
    const alert = await this.alertController.create({
      header: 'Elimina farmaco',
      message: `Sei sicuro di voler eliminare ${farmaco.farmaco.nome} ${farmaco.specifica.formato} ${farmaco.specifica.quantita}gr?`,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.farmacoServices.deleteFarmaco(farmaco.id);
            this.listfavorites$ = this.farmacoServices.favoritesFarmaci();
          }
        }
      ]
    });

    await alert.present();
  }

}
