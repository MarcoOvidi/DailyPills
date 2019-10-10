import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-armadietto',
  templateUrl: './armadietto.page.html',
  styleUrls: ['./armadietto.page.scss'],
})
export class ArmadiettoPage implements OnInit {

  constructor(
      private navController: NavController,
  ) { }

  ngOnInit() {
  }

  addFarmaco() {
    console.log('clciked');
    this.navController.navigateForward('addfarmaco');
  }

}
