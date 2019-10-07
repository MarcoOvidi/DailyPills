import {HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteService } from '../services/utente.service';
import { AlertController, NavController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private navController: NavController,
                private alertController: AlertController,
                private utenteService: UtenteService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.utenteService.getAuthToken();
        if (authToken !== null && authToken !== undefined && authToken !== '') {
            console.log('adding token into header');
            const authReq = req.clone({
                headers: new HttpHeaders({
                api_token:  authToken,
            })
            });
            return next.handle(authReq).pipe(
                catchError(err => {
                    this.showError(err);
                    return EMPTY;
                })
            );
        } else {
            return next.handle(req);
        }

    }

    // Gestione errore autenticazione
    async showError(err: HttpErrorResponse) {
        const errorMessage = `Status: ${err.status}, Message: ${err.message}`;

        const alert = await this.alertController.create({
            header: 'Errore',
            message: errorMessage,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navController.navigateRoot('login');
                    }
                }
            ]
        });

        await alert.present();
    }
}
