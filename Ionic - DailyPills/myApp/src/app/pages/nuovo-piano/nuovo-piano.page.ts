import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nuovo-piano',
  templateUrl: './nuovo-piano.page.html',
  styleUrls: ['./nuovo-piano.page.scss'],
})
export class NuovoPianoPage implements OnInit {

  private todayDate: String;
  constructor() { }

  ngOnInit() {

  }

}
