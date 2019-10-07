import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { URL } from '../../constants';
import { Farmaco } from '../models/farmaco.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FarmacoServices {

    constructor(private http: HttpClient) {
    }

    listFarmaci(): Observable<Farmaco[]> {
        return this.http.get<Farmaco[]>(URL.FARMACI, {})
    }

}
