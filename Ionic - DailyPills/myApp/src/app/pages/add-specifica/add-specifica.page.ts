import { Component, Input, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import { Specifica } from '../../models/specifica.model';
import { PickerController } from '@ionic/angular';
import { FarmacoServices } from '../../services/farmaco.services';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-specifica',
  templateUrl: './add-specifica.page.html',
  styleUrls: ['./add-specifica.page.scss'],
})
export class AddSpecificaPage implements OnInit {

  @Input() farmacoID: number;
  @Input() farmacoName: string;
  @Input() formati: Specifica[];

  private selectedtipologiaid$: number;
  private selectedtipologianame$: string;
  private selectedtipologiaquantita: number;

  constructor(
    private modalCtrl: ModalController,
    private pickCtrl: PickerController,
    private farmacoService: FarmacoServices,
    private alertController: AlertController,
    private tsService: TranslateService
  ) {}

  ngOnInit(): void {
    console.log(this.formati);
  }

  closeModal() {
    this.modalCtrl.dismiss('error');
  }

  async selectFormato() {
    const picker = await this.pickCtrl.create({
      animated: true,
      columns: [
        {
          name: 'TIPOLOGIA',
          options: this.formati.map((val) => (
              {
                text: val.formato + ' ' + val.quantita + 'mg',
                value: val.id
              }
              )
          )
        }
      ],
      mode: undefined,
      buttons: [
        {
          text: 'Fatto',
        }
      ]
    });

    picker.onDidDismiss().then(async data => {
      const format = await picker.getColumn('TIPOLOGIA');
      this.selectedtipologiaid$ = format.options[format.selectedIndex].value;
      this.selectedtipologianame$ = format.options[format.selectedIndex].text;
    });

    await picker.present();
  }

    async selectQuantity() {
      const pickerQuatity = await this.pickCtrl.create({
          columns: [
              {
                  name: 'QUANTITA',
                  options: [
                      {
                          text: '1pz',
                          value: 1
                      },
                      {
                          text: '10pz',
                          value: 10
                      },
                      {
                          text: '20pz',
                          value: 20
                      },
                      {
                          text: '50pz',
                          value: 50
                      }
                  ]

              }
          ],
          mode: undefined,
          buttons: [
              {
                  text: 'Fatto',
              }
          ]
      });

      pickerQuatity.onDidDismiss().then(async data => {
          const quantity = await pickerQuatity.getColumn('QUANTITA');
          this.selectedtipologiaquantita = quantity.options[quantity.selectedIndex].value;
      });

      return await pickerQuatity.present();
    }

  addArmadietto() {
    this.farmacoService.addArmadietto(this.farmacoID, this.selectedtipologiaid$, this.selectedtipologiaquantita).subscribe((val) => {
      if (val.success) {
        this.showAddSuccess();
      } else { this.showAddError(); }
    });
  }

  async showAddError() {
    const alert = await this.alertController.create({
      header: this.tsService.instant('ERRORE_INSERIMENTO'),
      message: this.tsService.instant('MSG_ERRORE_INSERIMENTO'),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await alert.present();

    alert.onDidDismiss().then(() => this.closeModal());
  }

  async showAddSuccess() {
    const alert = await this.alertController.create({
      header: this.tsService.instant('FARMACO_INSERITO'),
      message: this.tsService.instant('MSG_FARMACO_INSERITO'),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await alert.present();
    alert.onDidDismiss().then(() => this.closeModal());
  }


}
