import { Specifica } from './specifica.model';

export class Farmaco {
    id: number;
    nome: string;
    codice: number;
    ptn: string;
    'modalita_prescrizione': string;
    'quantita_autorizzate': number;
    produttore: string;
    principio: string;
    prezzo: number;
    types: Specifica[];
}

