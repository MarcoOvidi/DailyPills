import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Piano } from '../../models/piano.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AggiungiPiano, PianoServices } from '../../services/piano.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-info-piano',
  templateUrl: './edit-info-piano.page.html',
  styleUrls: ['./edit-info-piano.page.scss'],
})
export class EditInfoPianoPage implements OnInit {

  private currentDate$: string;
  private pianodetail: Piano;
  private insertpianoform: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private alertCtrl: AlertController,
      private pianoService: PianoServices,
      private navCtrl: NavController,
      private tsService : TranslateService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pianodetail = JSON.parse(params.preferito);
      console.log(params.preferito);
    });
    this.insertpianoform = this.formBuilder.group({
      nome: [this.pianodetail.nome, Validators.compose([
        Validators.required
      ])],
      inizio: [this.pianodetail.inizio, Validators.compose([
        Validators.required
      ])],
      fine: [this.pianodetail.fine, Validators.compose([
        Validators.required
      ])],
      descrizione: [this.pianodetail.descrizione, Validators.compose([
      ])],
    });
  }

  async updatePiano() {
    const alert =  await this.alertCtrl.create({
      header: this.tsService.instant('MODIFICA_PIANO'),
      message:  `${this.tsService.instant('MSG_MODIFICA_PIANO')} "${this.pianodetail.nome}"?`,
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
          text: this.tsService.instant('UPDATE_BUTTON'),
          handler: () => {
            const parameters: AggiungiPiano = this.insertpianoform.value;
            parameters.inizio = moment(parameters.inizio, 'YYYY-MM-DD').format('YYYY-MM-DD');
            parameters.fine =  moment(parameters.fine, 'YYYY-MM-DD').format('YYYY-MM-DD');
            this.pianoService.modifyPiano(parameters, this.pianodetail.id).subscribe((val) => {
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
      header: this.tsService.instant('MSG_ERRORE_CREAZIONE_PIANO'),
      message: Object.values(error).toLocaleString(),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await errorAlert.present();
  }

}
