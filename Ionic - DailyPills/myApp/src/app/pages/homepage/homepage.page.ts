import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import { FarmacoPiano } from '../../models/farmacopiano.model';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  private todaystring$: string;
  private farmacipiani$: Observable<FarmacoPiano[]>;
  private arrayFarmaci: FarmacoPiano[];

  constructor(
      private pianoService: PianoServices,
      private navController: NavController
  ) {
    this.farmacipiani$ = this.pianoService.allfarmaci();
    this.farmacipiani$.subscribe((val) => {
      this.arrayFarmaci = val;
    });
  }

  ngOnInit() {
    moment.locale('it');
    this.todaystring$ = moment(new Date()).format('LL');
    this.farmacipiani$.subscribe((val) => val);
  }

  refreshHome(event) {
    setTimeout(() => {
      this.farmacipiani$ = this.pianoService.allfarmaci();
      event.target.complete();
    }, 1500);
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
    console.log(id);
    this.arrayFarmaci.map((farm) => {
        if (farm.id === id) {
          farm.assunto = true;
          console.log('true');
        }
        return farm;
      });
    }


}
