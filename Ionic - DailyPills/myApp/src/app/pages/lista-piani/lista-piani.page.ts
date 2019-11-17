import { Component, OnInit } from '@angular/core';
import { Piano } from '../../models/piano.model';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import {AlertController, NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';
import {Preferito} from '../../models/preferito.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lista-piani',
  templateUrl: './lista-piani.page.html',
  styleUrls: ['./lista-piani.page.scss'],
})
export class ListaPianiPage implements OnInit {

  private pianilist$: Observable<Piano[]>;

  constructor(
      private pianoService: PianoServices,
      private navController: NavController,
      private alertCtrl: AlertController,
      private tsService: TranslateService,
  ) { }

  ngOnInit() {
    this.pianilist$ = this.pianoService.listPiani();
  }

  refreshPiani(event) {
    setTimeout(() => {
      this.pianilist$ = this.pianoService.listPiani();
      event.target.complete();
    }, 1500);
  }

  pianoDetailNav(piano: Piano) {
   const navigationExtras: NavigationExtras = {
          queryParams: {
              preferito: JSON.stringify(piano)
          }
    };

   this.navController.navigateForward(['tabs/piani/dettaglio-piano'], navigationExtras);
  }

    async delete(piano: Piano) {
        const alert = await this.alertCtrl.create({
            header: this.tsService.instant('ELIMINA_PIANO'),
            message: `${this.tsService.instant('MSG_ELIMINA_PIANO')} "${piano.nome}"?`,
            buttons: [
                {
                    text: this.tsService.instant('CANCEL_BUTTON'),
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                },
                {
                    text: this.tsService.instant('CONFIRMATION_BUTTON'),
                    handler: () => {
                        this.pianoService.removePiano(piano.id);
                        this.pianilist$ = this.pianoService.listPiani();
                    }
                }
            ]
        });

        await alert.present();
    }

  addPiano() {
    this.navController.navigateForward('tabs/piani/nuovo-piano');
  }

  update(piano: Piano) {
      const navigationExtras: NavigationExtras = {
          queryParams: {
              preferito: JSON.stringify(piano)
          }
      };

      this.navController.navigateForward(['tabs/piani/update'], navigationExtras);
  }

}
