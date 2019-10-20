import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { URL } from '../../constants';
import { Farmaco } from '../models/farmaco.model';
import { Preferito } from '../models/preferito.model';
import { Observable } from 'rxjs';
import { Piano } from '../models/piano.model';

export interface AggiungiPiano {
    idfarmaco: number;
    idtipo: number;
    quantita: number;
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

}
