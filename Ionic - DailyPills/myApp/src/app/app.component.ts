import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtenteService } from './services/utente.service';
import { LinguaService } from './services/lingua.service';
import {TranslateService} from '@ngx-translate/core';

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
      private linguaservice: LinguaService,
      private translate: TranslateService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        this.initTranslate();
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }

    ngOnInit(): void {

    }

    initTranslate() {
        const linguasave = this.linguaservice.getLinguaPreferita();
        this.translate.setDefaultLang(linguasave);
        this.linguaservice.getLinguaAttuale().subscribe((lingua: string) => {
            if (lingua == null) {
                this.translate.use(linguasave);
                this.linguaservice.updateLingua(linguasave);
            } else {
                this.translate.use(lingua);
            }
        });
    }

}
