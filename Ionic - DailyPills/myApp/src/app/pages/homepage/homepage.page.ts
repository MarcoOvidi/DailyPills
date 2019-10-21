import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  private todaystring$: string;

  constructor() { }

  ngOnInit() {
    moment.locale('it');
    this.todaystring$ = moment(new Date()).format('LL');
  }

}
