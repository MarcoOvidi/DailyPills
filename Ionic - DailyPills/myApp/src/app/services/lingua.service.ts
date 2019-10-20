import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { LINGUA } from '../../constants';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

export class Lingua {
    etichetta: string;
    valore: string;

}

@Injectable({
    providedIn: 'root'
})
export class LinguaService {

    italiano: Lingua = { etichetta: 'Italiano', valore: 'it' };
    english: Lingua = { etichetta: 'Inglese', valore: 'en' };
    lingue: Lingua[] = [ this.italiano, this.english ];

    constructor(private storage: Storage) {

    }

    getLinguaAttuale(): Observable<string> {
        return fromPromise(this.storage.get(LINGUA));
    }

    getLinguaPreferita(): string {
        return this.english.valore;
    }

    getLingue(): Lingua[] {
        return this.lingue;
    }

    updateLingua(nuovaLingua: string) {
        this.storage.set(LINGUA, nuovaLingua);
    }

}
