import { Component, Input, OnInit } from '@angular/core';
import { Specifica} from '../../models/specifica.model';
import { AlertController, ModalController, PickerController } from '@ionic/angular';
import { FarmacoServices } from '../../services/farmaco.services';
import * as moment from 'moment';
import { AggiungiMedicina, PianoServices } from '../../services/piano.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {

  @Input() idmedtype: number;
  @Input() farmacoName: string;
  @Input() specifica: Specifica;
  @Input() pianoName: string;
  @Input() idpiano: number;

  private selectedorarioassunzione$: string;
  private selectedquantitaassunzione$: string;
  private selectedDays$: string;

  constructor(
      private modalCtrl: ModalController,
      private pickCtrl: PickerController,
      private farmacoService: FarmacoServices,
      private alertController: AlertController,
      private pianoServices: PianoServices,
      private tsService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.selectedorarioassunzione$ = moment(new Date(), 'YYYY-MM-DD HH:mm').format('HH:mm');
    this.selectedquantitaassunzione$ = '1';
    this.selectedDays$ = this.tsService.instant('LUNEDI');
  }

  closeModal() {
    this.modalCtrl.dismiss('error');
  }

  selectOrario($event) {
    this.selectedorarioassunzione$ = moment($event.detail.value, 'HH:mm').format('HH:mm');
  }

  selectQuantita($event) {
    this.selectedquantitaassunzione$ = $event.detail.value;
  }

  selectedMultipleDays($event) {
    let stringBuilder = '';
    const last = $event.detail.value.pop();
    $event.detail.value.forEach((day) => {
      stringBuilder = stringBuilder.concat(`${day};`);
    });
    this.selectedDays$ = stringBuilder.concat(last);
  }

  async addFarmacoPiano() {
    const addAlert = await this.alertController.create({
      header: this.tsService.instant('AGGIUNGI_FARMACO_P'),
      message: `${this.tsService.instant('MSG_1_AGGIUNGI_FARMACO_P')} "${this.farmacoName} ${this.specifica.formato} ${this.specifica.quantita}gr" ${this.tsService.instant('MSG_2_AGGIUNGI_FARMACO_P')}`,
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
            const medicina: AggiungiMedicina = {
              idmedtype: this.idmedtype,
              orario: this.selectedorarioassunzione$,
              quantita: this.selectedquantitaassunzione$,
              days: this.selectedDays$
            };
            this.pianoServices.addFarmacoPiano(this.idpiano, medicina);
            this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await addAlert.present();
  }

  // async selectFormato() {
  //   const picker = await this.pickCtrl.create({
  //     animated: true,
  //     columns: [
  //       {
  //         name: 'TIPOLOGIA',
  //         options: this.formati.map((val) => (
  //                 {
  //                   text: val.formato + ' ' + val.quantita + 'mg',
  //                   value: val.id
  //                 }
  //             )
  //         )
  //       }
  //     ],
  //     mode: undefined,
  //     buttons: [
  //       {
  //         text: 'Fatto',
  //       }
  //     ]
  //   });
  //
  //   picker.onDidDismiss().then(async data => {
  //     const format = await picker.getColumn('TIPOLOGIA');
  //     this.selectedtipologiaid$ = format.options[format.selectedIndex].value;
  //     this.selectedtipologianame$ = format.options[format.selectedIndex].text;
  //   });
  //
  //   await picker.present();
  // }

  // async selectQuantity() {
  //   const pickerQuatity = await this.pickCtrl.create({
  //     columns: [
  //       {
  //         name: 'QUANTITA',
  //         options: [
  //           {
  //             text: '1pz',
  //             value: 1
  //           },
  //           {
  //             text: '10pz',
  //             value: 10
  //           },
  //           {
  //             text: '20pz',
  //             value: 20
  //           },
  //           {
  //             text: '50pz',
  //             value: 50
  //           }
  //         ]
  //
  //       }
  //     ],
  //     mode: undefined,
  //     buttons: [
  //       {
  //         text: 'Fatto',
  //       }
  //     ]
  //   });
  //
  //   pickerQuatity.onDidDismiss().then(async data => {
  //     const quantity = await pickerQuatity.getColumn('QUANTITA');
  //     this.selectedtipologiaquantita = quantity.options[quantity.selectedIndex].value;
  //   });
  //
  //   return await pickerQuatity.present();
  // }
  //
  // addArmadietto() {
  //   this.farmacoService.addArmadietto(this.farmacoID, this.selectedtipologiaid$, this.selectedtipologiaquantita).subscribe((val) => {
  //     if (val.success) {
  //       this.showAddSuccess();
  //     } else { this.showAddError(); }
  //   });
  // }
  //
  // async showAddError() {
  //   const alert = await this.alertController.create({
  //     header: 'Errore inserimento',
  //     message: 'Formato già presente nel proprio armadietto',
  //     buttons: ['OK']
  //   });
  //
  //   await alert.present();
  //
  //   alert.onDidDismiss().then(() => this.closeModal());
  // }
  //
  // async showAddSuccess() {
  //   const alert = await this.alertController.create({
  //     header: 'Farmaco Inserito',
  //     message: 'Il formato scelto è stato inserito nel tuo armadietto',
  //     buttons: ['OK']
  //   });
  //
  //   await alert.present();
  //   alert.onDidDismiss().then(() => this.closeModal());
  // }

}
