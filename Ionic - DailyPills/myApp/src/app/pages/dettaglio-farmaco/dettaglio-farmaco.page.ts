import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferito } from '../../models/preferito.model';

@Component({
  selector: 'app-dettaglio-farmaco',
  templateUrl: './dettaglio-farmaco.page.html',
  styleUrls: ['./dettaglio-farmaco.page.scss'],
})
export class DettaglioFarmacoPage implements OnInit {

  private farmacodetail$: Preferito;

  constructor(
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.farmacodetail$ = JSON.parse(params.preferito);
    });
  }

}
