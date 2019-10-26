import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Piano } from '../../models/piano.model';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import { FarmacoPiano } from '../../models/farmacopiano.model';
import { Farmaco } from '../../models/farmaco.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dettaglio-piano',
  templateUrl: './dettaglio-piano.page.html',
  styleUrls: ['./dettaglio-piano.page.scss'],
})
export class DettaglioPianoPage implements OnInit {

  private items: FarmacoPiano[] = [];

  private pianodetail: Piano;
  private farmacipiani$: Observable<FarmacoPiano[]>;

  constructor(
      private route: ActivatedRoute,
      private pianoService: PianoServices,
      private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pianodetail = JSON.parse(params.preferito);
    });
    this.farmacipiani$ = this.pianoService.pianoFarmacis(this.pianodetail.id);
    this.farmacipiani$.subscribe(val => this.items = val);
  }

  farmacoDetailNav(farmaco: Farmaco) {
    console.log('detail');
    console.log(this.items);
  }

  delete(farmaco: Farmaco) {
    console.log('delete');
  }

  addFarmacoPianoNavigate() {
    this.navCtrl.navigateForward('scegli-farmaco');
  }

}
