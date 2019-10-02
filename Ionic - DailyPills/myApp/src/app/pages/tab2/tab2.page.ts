import { Component, OnInit } from '@angular/core';
import { FarmacoServices } from '../../services/farmaco.services';
import { Farmaco } from '../../models/farmaco.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    private farmaci$: Observable<Farmaco[]>;

    constructor(private farmacoServices: FarmacoServices) {}

    ngOnInit() {
        this.farmaci$ = this.farmacoServices.list();
        this.farmacoServices.list().subscribe(res => console.log(res));
        // this.farmaci$ = new Observable<Farmaco[]>(observer => {
        //     observer.next(this.farmaci);
        // });
        // this.farmaci$.subscribe((val: Farmaco[]) => val.forEach((valor) => console.log(valor.nome))
        // );
    }

}
