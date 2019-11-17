import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AggiungiPiano, PianoServices } from '../../services/piano.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nuovo-piano',
  templateUrl: './nuovo-piano.page.html',
  styleUrls: ['./nuovo-piano.page.scss'],
})
export class NuovoPianoPage implements OnInit {

  private insertpianoform: FormGroup;
  private currentDate$: string;


  constructor(
      private formBuilder: FormBuilder,
      private alertCtrl: AlertController,
      private pianoService: PianoServices,
      private navCtrl: NavController,
      private tsService: TranslateService,
  ) { }

  ngOnInit() {
    this.currentDate$ = new Date().toString();
    this.insertpianoform = this.formBuilder.group({
      nome: ['', Validators.compose([
          Validators.required
      ])],
      inizio: [new Date().toString, Validators.compose([
        Validators.required
      ])],
      fine: [new Date().toString, Validators.compose([
        Validators.required
      ])],
      descrizione: ['', Validators.compose([
      ])],
    });
  }

  async submitPiano() {
    const alert =  await this.alertCtrl.create({
      header: this.tsService.instant('CREA_NUOVO_PIANO'),
      message: this.tsService.instant('MSG_CREA_NUOVO_PIANO'),
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
          text: this.tsService.instant('INSERT_BUTTON'),
          handler: () => {
            const parameters: AggiungiPiano = this.insertpianoform.value;
            parameters.inizio = moment(parameters.inizio, 'YYYY-MM-DD').format('YYYY-MM-DD');
            parameters.fine =  moment(parameters.fine, 'YYYY-MM-DD').format('YYYY-MM-DD');
            this.pianoService.createPiano(parameters).subscribe((val) => {
              this.navCtrl.navigateBack('/tabs/piani');
            }, ((err: HttpErrorResponse) => {
              alert.dismiss();
              this.showInsertPianoErrore(err);
            }));
          }
        }
      ]
    });

    await alert.present();
  }

  async showInsertPianoErrore(error: HttpErrorResponse) {
    const errorAlert = await this.alertCtrl.create({
      header: this.tsService.instant('ERRORE_CREAZIONE_PIANO'),
      message: Object.values(error).toLocaleString(),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await errorAlert.present();
  }

}
