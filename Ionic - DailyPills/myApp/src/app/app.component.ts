import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtenteService } from './services/utente.service';
import {Storage} from '@ionic/storage';
import {AUTH_TOKEN} from '../constants';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private utenteService: UtenteService,
      private statusBar: StatusBar,
      private navController: NavController,
      private storage: Storage
    ) {
        this.initializeApp();
        // this.utenteService.init();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }

    ngOnInit(): void {
        // this.storage.get(AUTH_TOKEN).then((val) => {
        //     if (val) {
        //         this.navController.navigateRoot('tabs');
        //     } else { this.navController.navigateRoot('login'); }
        // });
    }

}
