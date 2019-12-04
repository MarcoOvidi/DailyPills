import { Component, OnInit } from '@angular/core';
import { Lingua, LinguaService } from '../../services/lingua.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../models/user.model';
import { Updateuser, UtenteService } from '../../services/utente.service';
import {AlertController, NavController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.page.html',
  styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private user$: User;

  constructor(
      private translateService: TranslateService,
      private lingService: LinguaService,
      private formBuilder: FormBuilder,
      private usrService: UtenteService,
      private alrtCtrl: AlertController,
      private tsService: TranslateService,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.lingue = this.lingService.getLingue();
    this.user$ = this.usrService.getUser().value;

    this.profiloFormModel = this.formBuilder.group({
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])],
      name: [this.user$.name, Validators.compose([
        Validators.required
      ])],
      surname: [this.user$.surname, Validators.compose([
        Validators.required
      ])],
      email: [this.user$.email, Validators.compose([
        Validators.required
      ])],
    });

    this.lingService.getLinguaAttuale().subscribe((lingua) => {
      this.profiloFormModel.patchValue({linguaPreferita: lingua});
    });
  }

  Update(): void {
    this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    this.lingService.updateLingua(this.profiloFormModel.value.linguaPreferita);
    const parameters: Updateuser = this.profiloFormModel.value;
    this.usrService.update(parameters).subscribe((val) => {
      this.navCtrl.navigateRoot('tabs/homepage');
    }, (err: HttpErrorResponse) => {
      this.showRegistrationError(err.error.errors);
    });
  }

  async onSubmit() {
    const alert = await this.alrtCtrl.create({
      header: this.tsService.instant('AGGIORNA_PROFILO'),       /*****   DA MODIFICARE *****/
      message: this.tsService.instant('MSG_AGGIORNA_PROFILO'),
      buttons: [
        {
          text: this.tsService.instant('CANCEL_BUTTON'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annulla modifica');
          }
        },
        {
          text: this.tsService.instant('CONFIRMATION_BUTTON'),
          handler: () => {
            this.Update();
          }
        }
      ]
    });

    await alert.present();
  }

  async LogOut() {
    const alert = await this.alrtCtrl.create({
      header: 'Esci dall\'applicazione',
      message: 'Sei sicuro di voler effettuare il logout?',
      buttons: [
        {
          text: this.tsService.instant('CANCEL_BUTTON'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annulla logout');
          }
        },
        {
          text: this.tsService.instant('CONFIRMATION_BUTTON'),
          handler: () => {
            this.usrService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  async showRegistrationError(error) {
    const alert = await this.alrtCtrl.create({
      header: this.tsService.instant('ERRORE_REGISTRAZIONE'), //DA MODIFICARE
      message: Object.values(error).toLocaleString(),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await alert.present();
  }

}
