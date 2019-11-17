import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PianoServices} from '../../services/piano.service';
import { Observable } from 'rxjs';
import { FarmacoPiano } from '../../models/farmacopiano.model';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  private todaystring$: string;
  private farmacipiani$: Observable<FarmacoPiano[]>;
  private arrayFarmaci: FarmacoPiano[];
  private progressBar: number;

  constructor(
      private pianoService: PianoServices,
      private navController: NavController,
      private altCtrl: AlertController,
      private tsService: TranslateService,
  ) {
    this.farmacipiani$ = this.pianoService.allfarmaci();
  }

  ngOnInit() {
    moment.locale('it');
    this.todaystring$ = moment(new Date()).format('LL');
    this.farmacipiani$.subscribe((val) => {
      this.arrayFarmaci = val;
      this.progressCounter();
    });
    this.progressBar = 0;
  }

  refreshHome(event) {
    setTimeout(() => {
      this.farmacipiani$ = this.pianoService.allfarmaci();
      this.farmacipiani$.subscribe((val) => {
        this.arrayFarmaci = val;
        this.progressCounter();
      });
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
          farm.assunto = 1;
        }
        console.log(farm.assunto);
        return farm;
      });
    this.progressCounter();
    }

    async alertAssunzione(id: number) {
      const alert = await this.altCtrl.create({
        header: this.tsService.instant('CONFERMA_ASSUNZIONE'),
        message: this.tsService.instant('MSG_CONFERMA_ASSUNZIONE'),
        buttons: [
          {
            text: this.tsService.instant('CANCEL_BUTTON'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Piano non inserito');
            }
          },
          {
            text: this.tsService.instant('CONFIRMATION_BUTTON'),
            handler: () => {
              this.addAssunzione(id);
              this.pianoService.confirmAssunzione(id).subscribe((val) => {
                console.log('Assunto', val);
              }, (err: HttpErrorResponse) => {
                alert.dismiss();
                this.showAssunzioneError(err);
              });
            }
          }
        ]
      });

      await alert.present();
    }

    progressCounter() {
      let count = 0;
      this.arrayFarmaci.forEach((val) => {
          if (val.assunto === 1) { count += 1; }
      });
      this.progressBar = (count === 0) ? 0 : (((100 / this.arrayFarmaci.length) * count) / 100);
    }

  async showAssunzioneError(error: HttpErrorResponse) {
    const errorAlert = await this.altCtrl.create({
      header: this.tsService.instant('ERRORE_CONFERMA_ASSUNZIONE'),
      message: Object.values(error).toLocaleString(),
      buttons: ['OK']
    });

    await errorAlert.present();
  }


}
