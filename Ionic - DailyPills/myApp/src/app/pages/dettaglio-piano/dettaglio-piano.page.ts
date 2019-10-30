<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
=======
import { Component, OnInit } from '@angular/core';
import {FarmacoPiano} from '../../models/farmacopiano.model';
import {Piano} from '../../models/piano.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PianoServices} from '../../services/piano.service';
import {AlertController, NavController} from '@ionic/angular';
import {Farmaco} from '../../models/farmaco.model';
>>>>>>> c548a2ab93df3f2b5859e69ee6702b146bb0ebed

@Component({
  selector: 'app-dettaglio-piano',
  templateUrl: './dettaglio-piano.page.html',
  styleUrls: ['./dettaglio-piano.page.scss'],
})
<<<<<<< HEAD
export class DettaglioPianoPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    public navCtrk: NavController,

  ) { }

  ngOnInit() {

  }

=======
export class DettaglioPianoPage implements OnInit{

  private showLeftTab : boolean;
  private items: FarmacoPiano[] = [];
  private pianodetail: Piano;
  private farmacipiani$: Observable<FarmacoPiano[]>;
  private countFarmaci : number;

  constructor(
      private route: ActivatedRoute,
      private pianoService: PianoServices,
      private navCtrl: NavController,
      private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    console.log("VARIABILE",this.pianodetail)
    this.route.queryParams.subscribe(params => {
      this.pianodetail = JSON.parse(params.preferito);
    });
    this.farmacipiani$ = this.pianoService.pianoFarmacis(this.pianodetail.id);
    // this.farmacipiani$.subscribe(val => this.items = val);
    this.farmacipiani$.subscribe(val => { this.items = val; this.countFarmaci = this.items.length });
    this.showLeftTab = true;
  }


  changeTab(left : boolean) {
    this.showLeftTab = left;
  }

  farmacoDetailNav(farmaco: Farmaco) {
    console.log('detail');
    console.log(this.items);
  }

  async delete(farmaco: FarmacoPiano) {
    const removeAlert = await this.alertCtrl.create({
      header: 'Rimuovi Farmaco',
      // tslint:disable-next-line:max-line-length
      message: `Sei sicuro di voler rimuovere "${farmaco.farmaco.nome} ${farmaco.specifica.formato} ${farmaco.specifica.quantita}gr" dal piano "${this.pianodetail.nome}"?`,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ', blah);
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            this.pianoService.removeFarmaco(this.pianodetail.id, farmaco.id);
            this.farmacipiani$ = this.pianoService.pianoFarmacis(this.pianodetail.id);
            this.farmacipiani$.subscribe(val => this.items = val);
          }
        }
      ]
    });

    await removeAlert.present();
  }

  refreshArmadietto($event) {
    setTimeout(() => {
      this.farmacipiani$ = this.pianoService.pianoFarmacis(this.pianodetail.id);
      this.farmacipiani$.subscribe(val => this.items = val);
      $event.target.complete();
    }, 1500);
  }

  addFarmacoPianoNavigate() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        preferito: JSON.stringify(this.pianodetail.id)
      }
    };
    this.navCtrl.navigateForward(['tabs/piani/dettaglio-piano/scegli-farmaco'], navigationExtras);
  }
>>>>>>> c548a2ab93df3f2b5859e69ee6702b146bb0ebed
}
