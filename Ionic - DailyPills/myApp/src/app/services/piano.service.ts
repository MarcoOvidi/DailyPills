import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';


import { URL } from '../../constants';
import { Observable } from 'rxjs';
import { Piano } from '../models/piano.model';
import { map } from 'rxjs/operators';

export interface AggiungiPiano {
    inizio: string;
    fine: string;
    nome: string;
    descrizione: string;
}

@Injectable({
    providedIn: 'root'
})

export class PianoServices {

    constructor(private http: HttpClient) {
    }

    listPiani(): Observable<Piano[]> {
        return this.http.get<Piano[]>(URL.PIANI, {});
    }

    createPiano(piano: AggiungiPiano): Observable<any> {
        return this.http.post<any>(URL.ADD_PIANO, piano);
    }

}
