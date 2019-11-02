import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FarmacoPiano} from '../../models/farmacopiano.model';

@Component({
  selector: 'app-dettaglio-assunzione',
  templateUrl: './dettaglio-assunzione.page.html',
  styleUrls: ['./dettaglio-assunzione.page.scss'],
})
export class DettaglioAssunzionePage implements OnInit {

  private farmacoassunzionedetail$: FarmacoPiano;

  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.farmacoassunzionedetail$ = JSON.parse(params.farmacoPiano);
    });
  }

}
