import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PianoServices } from '../../services/piano.service';
import { Observable } from 'rxjs';
import { FarmacoPiano } from '../../models/farmacopiano.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  private todaystring$: string;
  private farmacipiani$: Observable<FarmacoPiano[]>;

  constructor(
      private pianoService: PianoServices
  ) {
    this.farmacipiani$ = this.pianoService.allfarmaci();
  }

  ngOnInit() {
    // moment.locale('it');
    // this.todaystring$ = moment(new Date()).format('LL');
  }

}
