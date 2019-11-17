import { Farmaco } from './farmaco.model';
import { Specifica } from './specifica.model';

export class FarmacoPiano {
    id: number;
    quantitagiorno: number;
    orarioassunzione: string;
    giornosettimana: string;
    farmaco: Farmaco;
    assunto: number;
    specifica: Specifica;
}
