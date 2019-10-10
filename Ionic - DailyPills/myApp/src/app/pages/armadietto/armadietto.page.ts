import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {FarmacoServices} from '../../services/farmaco.services';
import {Preferito} from '../../models/preferito.model';

@Component({
  selector: 'app-armadietto',
  templateUrl: './armadietto.page.html',
  styleUrls: ['./armadietto.page.scss'],
})
export class ArmadiettoPage implements OnInit {

  private listfavorites$: Preferito[];

  constructor(
      private navController: NavController,
      private farmacoServices: FarmacoServices
  ) { }

  ngOnInit() {
    this.farmacoServices.favoritesFarmaci().subscribe((res) => {
      this.listfavorites$ = res;
    });
  }

  addFarmaco() {
    console.log('clciked');
    this.navController.navigateForward('addfarmaco');
  }

}
