import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {AUTH_TOKEN, URL} from '../../constants';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../models/device.model';

export interface DeviceInfo {
    device_id: number;
    device_name: string;
}

@Injectable({
    providedIn: 'root'
})

export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            console.log(token);
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
    }

    // account = device_id & device_name

    setAuthToken(): Observable<Device> {
        const device: DeviceInfo = { device_id: 122323, device_name: 'Samsung Galaxy S6'};
        return this.http.post<Device>(URL.SIGN_IN, device, {observe: 'response'}).pipe(
            map((res: HttpResponse<any>) => {
              this.storage.set(AUTH_TOKEN, res.body.data.api_token);
              this.loggedIn$.next(true);
              return res.body.data.api_token;
            })
        );
        }

    // logout() {
    //     this.authToken = null;
    //     this.loggedIn$.next(true);
    //     this.storage.remove(AUTH_TOKEN);
    //     this.storage.remove(UTENTE_STORAGE);
    //
    //     // Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
    //     // Per gestirlo si dovrebbe fare lato server una blacklist.
    // }
    //
    // getUtente(): BehaviorSubject<Utente> {
    //     return this.utente$;
    // }
    //
    // getAuthToken(): string {
    //     return this.authToken;
    // }
    //
    // isLogged(): Observable<boolean> {
    //     return this.loggedIn$.asObservable();
    // }
    //
    // updateProfilo(nuovoUtente: Utente): Observable<Utente> {
    //     return this.http.post<Utente>(URL.UPDATE_PROFILO, nuovoUtente, {observe: 'response'}).pipe(
    //         map((resp: HttpResponse<Utente>) => {
    //             // Aggiornamento dell'utente nello storage.
    //             // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
    //             // e se l'utente chiude la app e la riapre i dati sono gia' presenti
    //             this.storage.set(UTENTE_STORAGE, resp.body);
    //             // update dell'observable dell'utente
    //             this.utente$.next(resp.body);
    //             return resp.body;
    //         }));
    // }

}
