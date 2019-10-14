import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Specifica } from '../../models/specifica.model';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-add-specifica',
  templateUrl: './add-specifica.page.html',
  styleUrls: ['./add-specifica.page.scss'],
})
export class AddSpecificaPage implements OnInit {

  @Input() firstName: string;
  @Input() formati: Specifica[];

  private selectedtipologiaid$: number;
  private selectedtipologianame$: string;

  constructor(
    private modalCtrl: ModalController,
    private pickCtrl: PickerController
  ) {}

  ngOnInit(): void {
    console.log(this.formati);
  }

  closeModal() {
    this.modalCtrl.dismiss('error');
  }

  async formClick() {
    const picker = await this.pickCtrl.create({
      animated: true,
      columns: [
        {
          name: 'TIPOLOGIA',
          options: this.formati.map((val) => (
              {
                text: val.formato + ' ' + val.quantita,
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


}
