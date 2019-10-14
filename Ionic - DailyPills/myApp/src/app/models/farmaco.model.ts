import { Specifica } from './specifica.model';

export class Farmaco {
    id: number;
    nome: string;
    aic: number;
    ptn: string;
    'modalita_prescrizione': string;
    'quantita_autorizzate': number;
    types: Specifica[];
}

