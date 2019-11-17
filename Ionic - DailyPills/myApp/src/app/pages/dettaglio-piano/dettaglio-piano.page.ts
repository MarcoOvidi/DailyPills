import { Component, OnInit } from '@angular/core';
import { FarmacoPiano } from '../../models/farmacopiano.model';
import { Piano } from '../../models/piano.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { PianoServices } from '../../services/piano.service';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-dettaglio-piano',
  templateUrl: './dettaglio-piano.page.html',
  styleUrls: ['./dettaglio-piano.page.scss'],
})
export class DettaglioPianoPage implements OnInit {

  private showLeftTab: boolean;
  private items: FarmacoPiano[] = [];
  private pianodetail: Piano;
  private farmacipiani$: Observable<FarmacoPiano[]>;
  private countFarmaci: number;

  constructor(
      private route: ActivatedRoute,
      private pianoService: PianoServices,
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      private tsService: TranslateService,
  ) {}

  ngOnInit() {
    moment.locale('it');
    this.route.queryParams.subscribe(params => {
      this.pianodetail = JSON.parse(params.preferito);
      console.log(params.preferito);
    });
    this.farmacipiani$ = this.pianoService.pianoFarmacis(this.pianodetail.id);
    this.farmacipiani$.subscribe(val => { this.items = val; this.countFarmaci = this.items.length; });
    this.showLeftTab = true;
  }


  changeTab(left: boolean) {
    this.showLeftTab = left;
  }

  farmacoDetailNav(farmaco: FarmacoPiano) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        farmacoPiano: JSON.stringify(farmaco)
      }
    };

    //piani/dettaglio-piano/dettaglio-assunzione
    this.navCtrl.navigateForward(['tabs/piani/dettaglio-piano/dettaglio-assunzione'], navigationExtras);
  }


  async delete(farmaco: FarmacoPiano) {
    const removeAlert = await this.alertCtrl.create({
      header: this.tsService.instant('ELIMINA_FARMACO_ARMADIETTO'),
      // tslint:disable-next-line:max-line-length
      message: `${this.tsService.instant('MSG_ELIMINA_FARMACO_ARMADIETTO')} "${farmaco.farmaco.nome} ${farmaco.specifica.formato} ${farmaco.specifica.quantita}gr" dal piano "${this.pianodetail.nome}"?`,
      buttons: [
        {
          text: this.tsService.instant('CANCEL_BUTTON'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ', blah);
          }
        },
        {
          text: this.tsService.instant('CONFIRMATION_BUTTON'),
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

  addFarmacoPianoNavigate() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        preferito: JSON.stringify(this.pianodetail.id)
      }
    };
    this.navCtrl.navigateForward(['tabs/piani/dettaglio-piano/scegli-farmaco'], navigationExtras);
  }

  visualizeDate(date: string) {
    return moment(date, 'YYYY-MM-DD').format('LL');
  }

  replace(giorni: string) {
    return giorni.replace(/;/gi, ', ');
  }

   update(piano: Piano) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                preferito: JSON.stringify(piano)
            }
        };

        this.navCtrl.navigateForward(['tabs/piani/update'], navigationExtras);
    }

}
