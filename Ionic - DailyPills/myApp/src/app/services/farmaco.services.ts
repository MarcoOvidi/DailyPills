import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specifica } from '../models/specifica.model';


import { URL } from '../../constants';
import { Farmaco } from '../models/farmaco.model';
import { Preferito } from '../models/preferito.model';
import { Observable } from 'rxjs';

export interface AggiungiFarmaco {
    idfarmaco: number;
    idtipo: number;
}

@Injectable({
    providedIn: 'root'
})

export class FarmacoServices {

    constructor(private http: HttpClient) {
    }

    listFarmaci(): Observable<Farmaco[]> {
        return this.http.get<Farmaco[]>(URL.FARMACI, {});
    }

    listaFormati(): Observable<Specifica[]> {
        return this.http.get<Specifica[]>(URL.SPECIFICHE, {});
    }

    favoritesFarmaci(): Observable<Preferito[]> {
        return this.http.get<Preferito[]>(URL.ARMADIETTO, {});
    }

    addArmadietto(idFarmaco, idType): Observable<any> {
        const farmacotipo: AggiungiFarmaco = { idfarmaco: idFarmaco, idtipo: idType};
        return this.http.post(URL.ADD_FARMACO, farmacotipo, {});
    }

    deleteFarmaco(idPreferito: number): void {
        this.http.delete(`${URL.REMOVE_FARMACO}/${idPreferito}`).subscribe((val) => {
            console.log('removed', val);
        });
    }

}
