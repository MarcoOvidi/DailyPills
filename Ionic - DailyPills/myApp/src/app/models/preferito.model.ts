import { Farmaco } from './farmaco.model';
import { Specifica } from './specifica.model';

export class Preferito {
    id: number;
    farmaco: Farmaco;
    specifica: Specifica;
}
