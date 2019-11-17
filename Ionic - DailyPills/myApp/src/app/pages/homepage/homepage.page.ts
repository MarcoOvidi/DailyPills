import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import { FarmacoPiano } from '../../models/farmacopiano.model';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  private todaystring$: string;
  private farmacipiani$: Observable<FarmacoPiano[]>;

  constructor(
      private pianoService: PianoServices,
      private navController: NavController
  ) {
    this.farmacipiani$ = this.pianoService.allfarmaci();
  }

  ngOnInit() {
    // moment.locale('it');
    // this.todaystring$ = moment(new Date()).format('LL');
  }

  farmacoDetailNav(farmaco: FarmacoPiano) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        farmacoPiano: JSON.stringify(farmaco)
      }
    };

    this.navController.navigateForward(['tabs/homepage/dettaglio-assunzione'], navigationExtras);
  }

    addAssunzione(id: number) {
      console.log('clicked checkbod');
    }


}
