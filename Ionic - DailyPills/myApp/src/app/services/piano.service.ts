import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';


import { URL } from '../../constants';
import { Observable } from 'rxjs';
import { Piano } from '../models/piano.model';
import { FarmacoPiano } from '../models/farmacopiano.model';

export interface AggiungiPiano {
    inizio: string;
    fine: string;
    nome: string;
    descrizione: string;
}

export interface AggiungiMedicina {
    idmedtype: number;
    orario: string;
    quantita: string;
    days: string[];
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

    pianoFarmacis(idpiano: number): Observable<FarmacoPiano[]> {
        return this.http.get<FarmacoPiano[]>(`${URL.PIANO_FARMACIS}/${idpiano}`, {});
    }

    removePiano(idpiano: number): void {
        this.http.delete<any>(`${URL.REMOVE_PIANO}/${idpiano}`, {}).subscribe((val) => {
            console.log('removed', val);
        });
    }

    addFarmacoPiano(idpiano: number, medicina: AggiungiMedicina) {
        this.http.post(`${URL.INSERT_FARMACO_PIANO}/${idpiano}`, medicina, {}).subscribe((val) => {
           console.log('add', val);
        });
    }

    removeFarmaco(idpiano: number, idmedtype: number) {
        this.http.delete<any>(`${URL.REMOVE_FARMACO_PIANO}/${idpiano}/${idmedtype}`, {}).subscribe((val) => {
            console.log('removed', val);
        });
    }

}
