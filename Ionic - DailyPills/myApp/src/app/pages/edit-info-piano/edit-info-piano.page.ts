import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Piano } from '../../models/piano.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AggiungiPiano, PianoServices } from '../../services/piano.service';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

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
      private navCtrl: NavController
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
      header: 'Modifica Piano',
      message:  `Sei sicuro di voler modificare il piano "${this.pianodetail.nome}"?`,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Piano non inserito');
          }
        },
        {
          text: 'Modifica',
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
      header: 'Errore creazione piano',
      message: Object.values(error).toLocaleString(),
      buttons: ['OK']
    });

    await errorAlert.present();
  }

}
