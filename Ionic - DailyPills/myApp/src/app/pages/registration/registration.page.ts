import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Registrazione, UtenteService} from '../../services/utente.service';
import { AlertController, NavController } from '@ionic/angular';
import {User} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  private loginFormModel: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private utenteService: UtenteService,
      private navController: NavController,
      private alertController: AlertController,
      private tsService : TranslateService,
  ) {

  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      name: ['', Validators.compose([
        Validators.required
      ])],
      surname: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      password_confirmation: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])]
    }, );
  }

  registerSubmit() {
    console.log(this.loginFormModel.value);
    const parameters: Registrazione = this.loginFormModel.value;
    this.utenteService.registration(parameters).subscribe((user: User) => {
        this.navController.navigateRoot('login');
    },
        ((error: HttpErrorResponse) => {
          this.showRegistrationError(error.error.errors);
        })
    );
  }

  async showRegistrationError(error) {
    const alert = await this.alertController.create({
      header: this.tsService.instant('ERRORE_REGISTRAZIONE'),
      message: Object.values(error).toLocaleString(),
      buttons: [this.tsService.instant('OK_BTN')]
    });

    await alert.present();
  }

  backtoLogin() {
    this.navController.navigateBack('login');
  }

}
