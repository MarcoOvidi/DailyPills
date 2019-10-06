import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {AUTH_TOKEN, URL, UTENTE_STORAGE} from '../../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface Account {
    userormail: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})

export class UtenteService {
    private authToken: string;
    private username: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            console.log(token);
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
        this.storage.get(UTENTE_STORAGE).then((user) => {
            console.log(user);
            this.utente$.next(user);
        });
    }

    // account = device_id & device_name

    setAuthToken(): Observable<User> {
        const account: Account = { userormail: 'ITh0rn97', password: 'Angelo1297'};
        return this.http.post<User>(URL.LOGIN, account, {observe: 'response'}).pipe(
            map((res: HttpResponse<User>) => {
              this.storage.set(AUTH_TOKEN, res.body.api_token);
              this.authToken = res.body.api_token;
              this.loggedIn$.next(true);
              this.username = res.body.username;
              return res.body;
            })
        );
    }

    getAuthToken(): string {
        return this.authToken;
    }

    getUsername(): string {
        return this.username;
    }
}
