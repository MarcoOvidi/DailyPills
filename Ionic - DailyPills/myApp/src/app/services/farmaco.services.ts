import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';


import { URL, AUTH_TOKEN } from '../../constants';
import { Farmaco } from '../models/farmaco.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FarmacoServices {
    private authToken: string;

    constructor(private http: HttpClient, private storage: Storage) {
       this.storage.get(AUTH_TOKEN).then(token => {
           console.log(token);
           this.authToken = token;
       });
    }

    list(): Observable<Farmaco[]> {
        const headers = {
            device_id: '122323',
            api_token: 'ashsahsahash'
        };
        const httpOptions = {
            headers: new HttpHeaders(
                headers
            )
        };
        return this.http.post<Farmaco[]>(URL.FARMACI, {}, httpOptions);
    }

    // findById(notiziaId: number): Observable<Notizia> {
    //     const apiURL = `${URL.NOTIZIE}/${notiziaId}`;
    //     return this.http.get<Notizia>(apiURL);
    // }

}
