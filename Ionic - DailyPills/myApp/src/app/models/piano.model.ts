import { FarmacoPiano } from './farmacopiano.model';

export class Piano {
    id: number;
    inizio: string;
    fine: string;
    nome: string;
    descrizione: string;
    farmaci: FarmacoPiano[];
}

