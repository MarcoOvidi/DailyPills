import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, UtenteService } from '../../services/utente.service';
import { User } from '../../models/user.model';
import { AlertController, NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginFormModel: FormGroup;
  // private loginSubtitle: string;
  // private loginTitle: string;

  constructor(
      private formBuilder: FormBuilder,
      private utenteService: UtenteService,
      private navController: NavController,
      private alertController: AlertController,
      // private translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      userormail: ['ITh0rn97', Validators.compose([
          Validators.required
      ])],
      password: ['', Validators.compose([
          Validators.required
      ])]
    });
    // this.initTranslate();
  }

  onLogin() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((user: User) => {
      // console.log(user);
      this.utenteService.setisLog();
      this.navController.navigateRoot('tabs');
    },
    (err: HttpErrorResponse) => {
      console.log('Username o password errati' + err.status);
      this.showLoginError();
    });
  }

  openRegisterPage() {
    this.navController.navigateForward('registration');
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: 'Errore login',
      message: 'Username o password errati',
      buttons: ['OK']
    });

    await alert.present();
  }

  // private initTranslate() {
  //   this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
  //     this.loginSubtitle = data;
  //   });
  //   this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
  //     this.loginTitle = data;
  //   });
  // }

}
