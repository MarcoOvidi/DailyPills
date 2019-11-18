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

export interface Registrazione {
    username: string;
    name: string;
    surname: string;
    password: string;
    password_confirmation: string;
    email: string;
}

export interface Updateuser {
    name: string;
    surname: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})

export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            this.authToken = token;
            console.log(token);
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
        this.storage.get(UTENTE_STORAGE).then((user) => {
            this.utente$.next(user);
        });
    }

    init() {

    }

    // account = device_id & device_name

    login(account: Account): Observable<User> {
        return this.http.post<User>(URL.LOGIN, account, {observe: 'response'}).pipe(
            map((res: HttpResponse<User>) => {
                this.storage.set(AUTH_TOKEN, res.body.api_token);
                this.storage.set(UTENTE_STORAGE, res.body);
                this.authToken = res.body.api_token;
                this.loggedIn$.next(true);
                this.utente$.next(res.body);
                return res.body;
            })
        );
    }

    registration(account: Registrazione): Observable<User> {
        return this.http.post<User>(URL.REGISTER, account, {observe: 'response'}).pipe(
            map((res: HttpResponse<User>) => {
                return res.body;
            })
        );
    }

    update(newvalue: Updateuser): Observable<any> {
        return this.http.post(URL.UPDATE, newvalue, {observe: 'response'})
    }

    getAuthToken(): string {
        return this.authToken;
    }

    getUser(): BehaviorSubject<User> {
        return this.utente$;
    }

    getisLogged(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    setisLog(): void {
        this.loggedIn$.next(true);
    }
}
