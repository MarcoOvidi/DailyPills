import { Component, OnInit } from '@angular/core';
import { FarmacoServices } from '../../services/farmaco.services';
import { Farmaco } from '../../models/farmaco.model';
import {observable, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {forEach} from '@angular-devkit/schematics';
import {stringify} from 'querystring';

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
    }

    liveMedicineFilter($event) {
        this.farmaci$ = this.farmaci$.pipe(
            map((res: Farmaco[]) => {
                return res.filter((val) => val.nome.includes($event.target.value));
            })
        );
    }

}
